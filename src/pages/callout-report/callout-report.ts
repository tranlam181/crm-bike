import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import * as XLSX from 'xlsx';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import moment from 'moment';
import { ApiCustomerProvider } from '../../providers/api-customer';

/**
 * Generated class for the CalloutReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-callout-report',
  templateUrl: 'callout-report.html',
})
export class CalloutReportPage {

  data = [ ['Đinh Văn Thọ', 25000], [3, '03/09/2019'] ];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  exportDetailFileName: string = 'bao_cao_goi_ra.xlsx';
  myForm: any
  isLoading: boolean = false
  reportData: any[]
  reportDataSum: number
  type = 'detail'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiAuthenticate: ApiAuthenticateProvider,
    public apiCustomer: ApiCustomerProvider,
    public app: App,
    public formBuilder: FormBuilder) {
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
    console.log('ionViewDidLoad CalloutReportPage');
  }

  onReportDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportCallout("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.isLoading = false
    })
  }

  onReportSum() {
    this.type = 'sum'
    this.isLoading = true

    this.apiCustomer.reportCallout("sum", this.myForm.value.date_sta, this.myForm.value.date_end)
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

    this.apiCustomer.reportCallout("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
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
              call_date: 'Ngày gọi',
              call_out_result: 'Kết quả gọi',
              user_name: 'Người gọi',
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
              "call_date",
              "call_out_result",
              "user_name",
              "shop_name"
            ]
          })
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'baocao')
        XLSX.writeFile(wb, this.exportDetailFileName)

        this.isLoading = false
    })
  }
}
