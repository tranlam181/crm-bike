import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import Utils from '../../../utils/utils';
import { ApiCustomerProvider } from '../../../providers/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';

/**
 * Generated class for the TabPassivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-passive',
  templateUrl: 'tab-passive.html',
})
export class TabPassivePage {

  customers:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  _load() {
    this.isLoading = true

    return this.apiCustomer.getCustomers('passive').then(data => {
      this.customers = data
      this.isLoading = false
    }).catch (err => {
      this.isLoading = false
    })
  }

  ionViewDidEnter() {
    this._load()
  }
  
  ionViewDidLoad() {
    this._load()
  }

  showDetailCustomer(ev, customer) {
    this.navCtrl.push(CustomerDetailPage, {khach_hang_id: customer.id});
  }

  onRefresh(refresher) {
    this._load().then(data => {
      refresher.complete();
    })
  }
}
