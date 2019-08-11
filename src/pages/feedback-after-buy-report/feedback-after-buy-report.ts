import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import { FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { ApiCustomerProvider } from '../../providers/api-customer';

/**
 * Generated class for the FeedbackAfterBuyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback-after-buy-report',
  templateUrl: 'feedback-after-buy-report.html',
})
export class FeedbackAfterBuyReportPage {

  myForm: any
  isLoading: boolean = false
  reportData: any[]
  reportDataSum: number
  type = 'detail'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiAuthenticate: ApiAuthenticateProvider,
    public app: App,
    public formBuilder: FormBuilder,
    public apiCustomer: ApiCustomerProvider) {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
      this.myForm = formBuilder.group({
          date_sta: [startOfMonth, Validators.compose([Validators.required])],
          date_end: [endOfMonth, Validators.compose([Validators.required])]
      });
 }

 async ionViewCanEnter() {
   let ok = await this.apiAuthenticate.checkLoggedIn()
   if (!ok) {
     setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
   }
   return ok
 }

  ionViewDidLoad() {
    this.onReportDetail()
  }

  onReportDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportAfterBuy("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.isLoading = false
    })
  }

  onReportSum() {
    this.type = 'sum'
    this.isLoading = true

    this.apiCustomer.reportAfterBuy("sum", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.reportDataSum = this.reportData.reduce((result, obj) => {
          result += obj.count_
          return result
        }, 0)
        this.isLoading = false
      })
  }

  onExcelDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportAfterBuy("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
          [
            {
              month_not_come: "Số tháng chưa đến",
              customer_type: "Loại KH",
              full_name: "Họ tên",
              precinct: "Phường/xã",
              district: "Quận/huyện",
              phone: "Điện thoại",
              bike_name: "Loại xe",
              bike_number: 'Biển số',
              feedback_date: 'Ngày gọi',
              feedback: 'Ý kiến mua xe',
              note: 'Ghi chú',
              shop_name: 'CH'
            },
            ...data
          ],
          {
            skipHeader: true,
            header: [
              "month_not_come",
              "customer_type",
              "full_name",
              "precinct",
              "district",
              "phone",
              "bike_name",
              "bike_number",
              "feedback_date",
              "feedback",
              "note",
              "shop_name"
            ]
          })
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'bao_cao_y_kien_mua_xe')
        XLSX.writeFile(wb, "bao_cao_y_kien_mua_xe.xlsx")

        this.isLoading = false
    })
  }
}