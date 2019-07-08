import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';
import Utils from '../../../utils/utils';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';

/**
 * Generated class for the TabBirthdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-birthday',
  templateUrl: 'tab-birthday.html',
})
export class TabBirthdayPage {

  customers:any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  ionViewDidLoad() {
    let loading = Utils.showLoading(this.loadingCtrl)
    this.apiCustomer.getCustomers('birthday').then(data => {
      this.customers = data
      loading.dismiss()
    }).catch (err => {
      console.log("Error on ionViewDidLoad TabBirthdayPage:>>", err);  
      loading.dismiss()
    })
  }

  showDetailCustomer(ev, customer) {
    this.navCtrl.push(CustomerDetailPage, {khach_hang_id: customer.id});
  }
  
}
