import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';
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
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  ionViewDidLoad() {
    this.isLoading = true
    this.apiCustomer.getCustomers('birthday').then(data => {
      this.customers = data
      this.isLoading = false
    }).catch (err => {
      console.log("Error on ionViewDidLoad TabBirthdayPage:>>", err);  
      this.isLoading = false
    })
  }

  showDetailCustomer(ev, customer) {
    this.navCtrl.push(CustomerDetailPage, {khach_hang_id: customer.id});
  }
  
}
