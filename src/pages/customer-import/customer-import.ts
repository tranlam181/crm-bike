import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App } from 'ionic-angular';
import * as XLSX from 'ts-xlsx';
import Utils from '../../utils/utils';
import moment from 'moment';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import sleep from 'sleep-promise';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CustomerImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-import',
  templateUrl: 'customer-import.html',
})
export class CustomerImportPage {

  file: File
  arrayBuffer: any
  isLoading: boolean = false
  customer_list: any[]
  shop_list: any[]
  district_list: any[]
  bike_types: any[]
  progress_index: number = 0 
  progress_all: number = 0

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private apiCategory: ApiCategoryProvider,
    private apiCustomer: ApiCustomerProvider,
    private apiAuthenticate: ApiAuthenticateProvider,
    private app: App) {
  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
  }

  ionViewDidLoad() {
    this.isLoading = true
    this.apiCategory.getBikeTypes().then((data: any[]) => {
      this.bike_types = data
      return "OK"
    }).then(msg => 
      this.apiCategory.getShops().then((data: any[]) => {
        this.shop_list = data
      })
    ).then(obj =>
      this.apiCategory.getDistricts("QTR").then((data: any[]) => {
        this.district_list = data
        this.isLoading = false
      })
    ).catch(err => {
      console.log("Error on CustomerImportPage: ", err);  
      this.isLoading = false
    })
  }

  onChangeFile(ev) {
    this.file = ev.target.files[0]; 
  }

  _checkValueInArray(arr: any[], val) {
    let filterArr = arr.filter((obj: any, idx) => obj.name == val || obj.district_code == val)
    return filterArr.length >= 1
  }

  _getKeyInArray(arr: any[], val) {
    let filterArr = arr.filter((obj: any, idx) => obj.name == val || obj.district_code == val)
    return filterArr.length >= 1 ? filterArr[0].id : null
  }

  _importCustomer(customer) {
    // chuan hoa du lieu ngay tu client cho mau
    customer.NGAY_SINH = customer.NGAY_SINH ? customer.NGAY_SINH.replace(/[^/0-9]/gi,"") : ''
    customer.NGAY_MUA = customer.NGAY_MUA ? customer.NGAY_MUA.replace(/[^/0-9]/gi,"") : ''
    customer.DIEN_THOAI = customer.DIEN_THOAI ? customer.DIEN_THOAI.replace(/[^0-9]/gi,"") : ''

    if ( !moment(customer.NGAY_SINH, "DD/MM/YYYY").isValid() ) {
      customer.result = "Ngày sinh không đúng"
      customer.color = "danger"
      return
    }

    if ( !moment(customer.NGAY_MUA, "DD/MM/YYYY").isValid() ) {
      customer.result = "Ngày mua không đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.DIEN_THOAI.length || customer.DIEN_THOAI.length > 10) {
      customer.result = "Điện thoại chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.HO_TEN ) {
      customer.result = "Họ tên chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.hasOwnProperty('GIOI_TINH') ) {
      customer.result = "Giới tính chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.HUYEN || !this._checkValueInArray(this.district_list, customer.HUYEN)) {
      customer.result = "Mã huyện chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.LOAI_XE || !this._checkValueInArray(this.bike_types, customer.LOAI_XE)) {
      customer.result = "Loại xe chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.BIEN_SO ) {
      customer.result = "Biển số chưa đúng"
      customer.color = "danger"
      return
    }

    if ( !customer.CUA_HANG || !this._checkValueInArray(this.shop_list, customer.CUA_HANG)) {
      customer.result = "Cửa hàng chưa đúng"
      customer.color = "danger"
      return
    }

    customer.birthday = moment(customer.NGAY_SINH, "DD/MM/YYYY").format("YYYY-MM-DD")
    customer.buy_date = moment(customer.NGAY_MUA, "DD/MM/YYYY").format("YYYY-MM-DD")
    customer.phone = customer.DIEN_THOAI
    customer.full_name = customer.HO_TEN
    customer.sex = customer.GIOI_TINH
    customer.bike_type_id = this._getKeyInArray(this.bike_types, customer.LOAI_XE)
    customer.bike_number = customer.BIEN_SO
    customer.shop_id = this._getKeyInArray(this.shop_list, customer.CUA_HANG)
    customer.district_code = customer.HUYEN

    this.apiCustomer.addCustomer(customer).then((result: any) => {
      customer.result = result.msg
    })
  }

  onImportCustomer() {
    if (!this.file) {
      Utils.showToast(this.toastCtrl, "Bạn phải chọn file excel để import")
      return
    }

    this.isLoading = true
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();

        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);

        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type: "binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.customer_list = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        
        this.progress_all = this.customer_list.length;

        (async () => {
          for (let index = 0; index < this.customer_list.length; index++) {
            await sleep(120);
            this.progress_index = index
            this._importCustomer(this.customer_list[index])
          }
          this.isLoading = false
        })();        
    }

    fileReader.readAsArrayBuffer(this.file);
  }
}
