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
    this.apiCustomer.reportCallout("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
      })
  }

  onReportSum() {
    this.type = 'sum'
    this.apiCustomer.reportCallout("sum", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.reportDataSum = this.reportData.reduce((result, obj) => {
          result += obj.count_
          return result
        }, 0)
      })
  }

  onExcelDetail() {
    console.log("Xuat excel");
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([], {skipHeader: true})
    // XLSX.utils.sheet_add_json(ws, [
    //   'Số tháng chưa đến', 
    //   'Loại KH',
    //   'Họ tên',
    //   'Phường/xã',
    //   'Quận/huyện',
    //   'Điện thoại',
    //   'Loại xe',
    //   'Biển số',
    //   'Ngày gọi',
    //   'Kết quả gọi',
    //   'Người gọi',
    //   'CH'
    // ])
    XLSX.utils.sheet_add_json(ws, this.reportData, {
      origin: -1,
      skipHeader: true
    })
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'baocao')
    XLSX.writeFile(wb, this.exportDetailFileName)
    console.log(this.myForm.value);
    
  }
}
