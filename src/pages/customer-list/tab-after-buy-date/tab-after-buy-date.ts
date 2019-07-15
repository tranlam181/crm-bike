import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';
import { FeedbackAfterBuyPage } from '../../feedback-after-buy/feedback-after-buy';

/**
 * Generated class for the TabAfterBuyDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-after-buy-date',
  templateUrl: 'tab-after-buy-date.html',
})
export class TabAfterBuyDatePage {

  customers:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  ionViewDidLoad() {
    this._load()
  }

  _load() {
    this.isLoading = true
    return this.apiCustomer.getCustomers('after10BuyDate').then(data => {
      this.customers = data
      this.isLoading = false
    }).catch (err => {
      this.isLoading = false
    })
  }

  showFeedbackAfterBuy(ev, customer) {
    this.navCtrl.push(FeedbackAfterBuyPage, {khach_hang_xe_id: customer.khach_hang_xe_id});
  }

  onRefresh(refresher) {
    this._load().then(data => {
      refresher.complete();
    })
  }
}
