import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ApiCustomerProvider } from '../../providers/api-customer';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import * as XLSX from 'xlsx';

/**
 * Generated class for the CustomerExportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-export',
  templateUrl: 'customer-export.html',
})
export class CustomerExportPage {

  isLoading: boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apiCustomer: ApiCustomerProvider,
    public apiAuthenticate: ApiAuthenticateProvider,
    public app: App) {
  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerExportPage');
  }

  _exportExcel(data: any[], fileName,  sheetName) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      [
        {
          month_not_come: "Số tháng chưa đến",
          customer_type: "Loại KH",
          full_name: "Họ tên",
          sex: "Giới tính",
          phone: "Điện thoại",
          precinct: "Phường/xã",
          district: "Quận/huyện",
          bike_name: "Loại xe",
          bike_number: 'Biển số',
          maintance_date: 'Ngày đến',
          maintance_name: 'Loại hình KH',
          price_wage: 'Tiền công',
          price_equip: 'Tiền phụ tùng',
          maintance_detail: 'Chi tiết dịch vụ',
          maintance_feedback: 'Ý kiến sau dịch vụ',
          shop_name: 'CH',
          buy_feedback: 'Ý kiến mua xe',
          note: 'Ghi chú'
        },
        ...data
      ],
      {
        skipHeader: true
      })
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, fileName)
  }

  onExportActive() {
    this.isLoading = true

    this.apiCustomer.exportCustomer("active").then((data: any[]) => {
      this._exportExcel(data, "khach_hang_thuong_xuyen.xlsx", 'khach_hang_thuong_xuyen')
      this.isLoading = false
    })
  }

  onExportPassive() {
    this.isLoading = true

    this.apiCustomer.exportCustomer("passive").then((data: any[]) => {
      this._exportExcel(data, "khach_hang_thu_dong.xlsx", 'khach_hang_thu_dong')
      this.isLoading = false
    })
  }

  onExportAll() {
    this.isLoading = true

    this.apiCustomer.exportCustomer("all").then((data: any[]) => {
      this._exportExcel(data, "tat_ca_khach_hang.xlsx", 'tat_ca_khach_hang')
      this.isLoading = false
    })
  }
}
