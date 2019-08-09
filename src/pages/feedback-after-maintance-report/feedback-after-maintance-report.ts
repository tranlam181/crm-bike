import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import * as XLSX from 'xlsx';
import { ApiCustomerProvider } from '../../providers/api-customer';
import { FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';

/**
 * Generated class for the FeedbackAfterMaintanceReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback-after-maintance-report',
  templateUrl: 'feedback-after-maintance-report.html',
})
export class FeedbackAfterMaintanceReportPage {
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
  }

  onReportDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportAfterMaintance("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.isLoading = false
    })
  }

  onExcelDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportAfterMaintance("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
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
              maintance_date: 'Ngày đến',
              maintance_name: 'Loại hình KH',
              price_wage: 'Tiền công',
              price_equip: 'Tiền phụ tùng',
              maintance_detail: 'Chi tiết dịch vụ',
              feedback_date: 'Ngày gọi',
              feedback: 'Ý kiến sau dịch vụ',
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
              "maintance_date",
              "maintance_name",
              "price_wage",
              "price_equip",
              "maintance_detail",
              "feedback_date",
              "feedback",
              "shop_name"
            ]
          })
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'bao_cao_y_kien_sau_dich_vu')
        XLSX.writeFile(wb, "bao_cao_y_kien_sau_dich_vu.xlsx")

        this.isLoading = false
    })
  }
}
