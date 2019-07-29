import { Component, HostListener } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import Utils from '../../utils/utils';
import AppConfig from '../../config/app-config';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  bao_duong_id: number
  khach_hang_id: number
  customer = {
    full_name: '',
    phone: '',
    maintance_date: '',
    maintance_name: '',
    bike_name: ''
  }
  maintance_details: [any]
  sum = 0
  schedule = {
    bao_duong_id: '',
    book_date: '',
    dich_vu_id: '',
    is_free: true
  }
  dich_vu_list: [any]
  opinion_list:any
  isLoading:boolean = false
  maxSelectableDate: string
  maintances: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController) {

    this.bao_duong_id = navParams.data.bao_duong_id
    this.khach_hang_id = navParams.data.khach_hang_id
    this.schedule.bao_duong_id = navParams.data.bao_duong_id
    let curDate = new Date()
    curDate.setFullYear(curDate.getFullYear() + 5)
    this.maxSelectableDate = curDate.toISOString().substring(0, 10)
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.navCtrl.canGoBack()) {
      this.navCtrl.pop()
    }
  }
  
  ionViewDidLoad() {
    console.log('FeedbackAfterMaintancePage bao_duong_id=' + this.bao_duong_id);
    this._load()
  }

  _load() {
    this.isLoading = true
    this.apiCustomer.getCustomerMaintanceInfo(this.bao_duong_id).then((data:any) => {
      this.customer = data
      return "OK"
    }).then(msg => {
      return this.apiCustomer.getMaintanceDetails(this.bao_duong_id).then((data:any) => {
        this.maintance_details = data
        this.sum = this.maintance_details.reduce((last, e, idx) => {
          last += e.price
          return last
        }, 0)
      })
    }).then(msg => {
      return this.apiCategory.getServiceTypes().then((data: any) => {
        this.dich_vu_list = data
      })
    }).then(msg => {
      return this.apiCustomer.getCustomerMaintances(this.khach_hang_id).then(data => {
        this.maintances = data
      })
    })
    .then(data => {
      this.isLoading = false
    }).catch(err => {
      this.isLoading = false
    })
  }

  onSaveSchedule() {
    console.log(this.schedule);
    let loading = Utils.showLoading(this.loadingCrtl)

    this.apiCustomer.addSchedule(this.schedule).then((data:any) => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        this.navCtrl.pop()
      })
    }).catch(err => {
      console.log(err);
      
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    })
  }

  onCallPhone(phone) {
    window.open(AppConfig.baseUrl3C + phone,'_system', 'location=yes');
  }

}
