import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import Utils from '../../utils/utils';

/**
 * Generated class for the FeedbackAfterBuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback-after-buy',
  templateUrl: 'feedback-after-buy.html',
})
export class FeedbackAfterBuyPage {

  khach_hang_xe_id: number
  customer = {
    full_name: '',
    phone: '',
    birthday: '',
    buy_date: '',
    bike_name: ''
  }
  feedback_after_buy = {
    khach_hang_xe_id: '',
    y_kien_mua_xe_id: '',
    bike_number: '',
    note: '',
    book_date: '',
    dich_vu_id: '',
    is_free: false
  }
  opinion_list:any
  isLoading:boolean = false
  dich_vu_list: [any]
  maxSelectableDate: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController) {

    this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
    this.feedback_after_buy.khach_hang_xe_id = navParams.data.khach_hang_xe_id
    let curDate = new Date()
    curDate.setFullYear(curDate.getFullYear() + 5)
    this.maxSelectableDate = curDate.toISOString().substring(0, 10)
  }

  ionViewDidLoad() {
    console.log('FeedbackAfterBuyPage khach_hang_xe_id=' + this.khach_hang_xe_id);
    this._load()
  }

  _load() {
    console.log('ionViewDidLoad CalloutPage ' + this.khach_hang_xe_id);
    this.isLoading = true

    this.apiCategory.getBuyOpinions().then(data => {
      this.opinion_list = data
      return 'OK'
    }).then(msg => {
      return this.apiCustomer.getCustomerBikeInfo(this.khach_hang_xe_id).then((data:any) => {
        this.customer = data
      })
    }).then(msg => {
      return this.apiCategory.getServiceTypes().then((data: any) => {
        this.dich_vu_list = data
      })
    })
    .then(data => {
      this.isLoading = false
    }).catch(err => {
      this.isLoading = false
    })
  }

  onSaveFeedbackAfterBuy() {
    console.log(this.feedback_after_buy);
    let loading = Utils.showLoading(this.loadingCrtl)

    this.apiCustomer.updateFeedbackAfterBuy(this.feedback_after_buy).then((data:any) => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        this.navCtrl.pop()
      })
    }).catch(err => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    })
  }

  onCallPhone(phone) {
    console.log(phone);

  }
}
