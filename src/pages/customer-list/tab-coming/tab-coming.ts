import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';
import Utils from '../../../utils/utils';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';

/**
 * Generated class for the TabComingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-coming',
  templateUrl: 'tab-coming.html',
})
export class TabComingPage {

  customers:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
  }

  ionViewDidLoad() {
    this.isLoading = true
    this.apiCustomer.getCustomers('coming').then(data => {
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
