import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';

/**
 * Generated class for the TabActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-active',
  templateUrl: 'tab-active.html',
})
export class TabActivePage {

  customers:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  _load() {
    this.isLoading = true

    return this.apiCustomer.getCustomers('active').then(data => {
      this.customers = data
      this.isLoading = false
    }).catch (err => {
      this.isLoading = false
    })
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
