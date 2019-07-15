import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer/api-customer';
import Utils from '../../utils/utils';

/**
 * Generated class for the FeedbackAfterMaintancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback-after-maintance',
  templateUrl: 'feedback-after-maintance.html',
})
export class FeedbackAfterMaintancePage {

  bao_duong_id: number
  customer = {
    full_name: '',
    phone: '',
    maintance_date: '',
    bike_name: ''
  }
  maintance_details: [any]
  sum = 0
  feedback_after_maintance = {
    bao_duong_id: '',
    feedback: '',
    is_complain: false
  }
  opinion_list:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController) {

    this.bao_duong_id = navParams.data.bao_duong_id
    this.feedback_after_maintance.bao_duong_id = navParams.data.bao_duong_id
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
    }).then(data => {
      this.isLoading = false
    }).catch(err => {
      this.isLoading = false
    })
  }

  onSaveFeedbackAfterMaintance() {
    console.log(this.feedback_after_maintance);
    // let loading = Utils.showLoading(this.loadingCrtl)

    // this.apiCustomer.updateFeedbackAfterBuy(this.feedback_after_maintance).then((data:any) => {
    //   loading.dismiss()
    //   Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
    //     this.navCtrl.pop()
    //   })
    // }).catch(err => {
    //   loading.dismiss()
    //   Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    // })
  }
}
