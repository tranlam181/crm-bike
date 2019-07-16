import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer';
import { FeedbackAfterMaintancePage } from '../../feedback-after-maintance/feedback-after-maintance';

/**
 * Generated class for the TabAfterMaintanceDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-after-maintance-date',
  templateUrl: 'tab-after-maintance-date.html',
})
export class TabAfterMaintanceDatePage {

  customers:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  _load() {
    this.isLoading = true
    return this.apiCustomer.getCustomers('after3MaintanceDate').then(data => {
      this.customers = data
      this.isLoading = false
    }).catch (err => {
      this.isLoading = false
    })
  }

  ionViewDidLoad() {
    this._load()
  }

  showFeedbackAfterMaintance(ev, customer) {
    this.navCtrl.push(FeedbackAfterMaintancePage, {bao_duong_id: customer.bao_duong_id});
  }

  onRefresh(refresher) {
    this._load().then(data => {
      refresher.complete();
    })
  }	 
}
