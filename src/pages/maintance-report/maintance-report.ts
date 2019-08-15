import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import * as XLSX from 'xlsx';
import { ApiCustomerProvider } from '../../providers/api-customer';
import { FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';

import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts-x';

/**
 * Generated class for the MaintanceReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-maintance-report',
  templateUrl: 'maintance-report.html',
})
export class MaintanceReportPage {

  p: number = 1
  itemsPerPage: number = 15
  myForm: any
  isLoading: boolean = false
  reportData: any[]
  reportDataSum: number
  type = 'detail'

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { 
      xAxes: [{barThickness: 12, scaleLabel: {display: true}}], 
      yAxes: [{}] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartData = [
    { data: [], label: 'Số lượng' },
  ];
  
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
    this.onReportDetail()
  }

  onReportDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportMaintance("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.isLoading = false
    })
  }

  onReportSum() {
    this.type = 'sum'
    this.isLoading = true

    this.apiCustomer.reportMaintance("sum", this.myForm.value.date_sta, this.myForm.value.date_end)
      .then((data: any[]) => {
        this.reportData = data
        this.reportDataSum = this.reportData.reduce((result, obj) => {
          result += obj.count_
          return result
        }, 0)

        // chart
        this.barChartLabels.length = 0
        this.barChartData[0].data.length = 0
        data.map((e, idx) => {
          this.barChartLabels.push(e.maintance_name)
          this.barChartData[0].data.push(e.count_)
        })
        this.chart.chart.update()

        this.isLoading = false
      })
  }

  onExcelDetail() {
    this.type = 'detail'
    this.isLoading = true

    this.apiCustomer.reportMaintance("detail", this.myForm.value.date_sta, this.myForm.value.date_end)
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
              maintance_detail: 'Ghi chú',
              shop_name: 'CH'
            },
            ...data
          ],
          {
            skipHeader: true
          })
        const wb: XLSX.WorkBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'bao_cao_kh_den')
        XLSX.writeFile(wb, 'bao_cao_kh_den.xlsx')

        this.isLoading = false
    })
  }
}
