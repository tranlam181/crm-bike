import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer/api-customer';
import Utils from "../../utils/utils";
import { CustomerDetailPage } from '../customer-detail/customer-detail';

/**
 * Generated class for the CustomerAddNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-add-new',
  templateUrl: 'customer-add-new.html',
})
export class CustomerAddNewPage {
  customer = {
    full_name: '',
    province_code: '',
    district_code: '',
    precinct_code: '',
    phone: '',
    birthday: '',
    bike_type_id: '',
    shop_id: '',
    bike_number: '',
    buy_date: '',
    sex: ''
  }
  province_list: any
  district_list: any
  precinct_list: any
  bike_type_list: any
  shop_list: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    let loading = Utils.showLoading(this.loadingCtrl) //this._showLoading()
    this.apiCategory.getProvinces().then(data => {
      this.province_list = data
      return "OK"
    }).then(msg => {
      return this.apiCategory.getBikeTypes().then(data => {
        this.bike_type_list = data
      })
    }).then(msg => {
      return this.apiCategory.getShops().then(data => {
        this.shop_list = data
      })
    }).then(msg => {
      let curDaete = new Date()
      let formatedDate = curDaete.toISOString().substring(0, 10)
      this.customer.buy_date = formatedDate
      return "OK"
    }).then(msg => {
      loading.dismiss()
    }).catch(err => {
      console.log("Error on ionViewDidLoad:>>", err);  
      loading.dismiss()    
    })
  }

  addNewCustomer() {
    let loading = Utils.showLoading(this.loadingCtrl) //this._showLoading()
    this.apiCustomer.addCustomer(this.customer).then((data:any) => {
      loading.dismiss()
      Utils.showToast(this.toastCtrl, data.msg) //this._showToast(data.msg)
      this.navCtrl.setRoot(CustomerDetailPage)
    }).catch(err => {
      loading.dismiss()
      Utils.showToast(this.toastCtrl, err.msg) //this._showToast(err.msg)
    })
  }

  onChangeProvince(val) {
    console.log(val);
    this.district_list = [{district_code:'', name:'Đang tải...'}]
    this.apiCategory.getDistricts(val).then(data => {
      this.district_list = data
      this.precinct_list = []
    })
  }

  onChangeDistrict(val) {
    this.precinct_list = [{precinct_code:'', name:'Đang tải...'}]
    this.apiCategory.getPrecincts(this.customer.province_code, val).then(data => {
      this.precinct_list = data
    })
  }
}
