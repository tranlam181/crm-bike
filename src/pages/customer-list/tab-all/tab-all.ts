import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';
import Utils from "../../../utils/utils";
import EVENTS from '../../../providers/EVENTS';
import { CustomerAddNewPage } from '../../customer-add-new/customer-add-new';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-all',
  templateUrl: 'tab-all.html',
})
export class TabAllPage {

  users: any
  filterUsers: any
  searchCustomerString: string = ''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController,
    public events: Events) {
      events.subscribe(EVENTS.CUSTOMER_EDITED, (user, time) => {
        console.log('We clicked on Customer Detail page', user, time);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad customerList');
    
    let loading = Utils.showLoading(this.loadingCtrl)
    this.apiCustomer.getCustomers().then(data => {
      this.users = data
      this.filterUsers = data
      loading.dismiss()
    }).catch (err => {
      console.log("Error on ionViewDidLoad CustomerListPage:>>", err);  
      loading.dismiss()
    })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter customerList');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload() customerList');
    this.events.unsubscribe(EVENTS.CUSTOMER_EDITED)
  }

  _resetFilterUsers() {
    this.filterUsers = [...this.users]
  }

  searchCustomer(ev) {
    // Reset items back to all of the items
    this._resetFilterUsers()

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterUsers = this.users.filter((item) => {
        return (
          item.full_name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.phone.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      })
    }
  }

  callCustomer(ev, user) {
  }

  showDetailCustomer(ev, user) {
    this.navCtrl.push(CustomerDetailPage, {user: user});
  }

  onAddCustomer(ev) {
    this.navCtrl.setRoot(CustomerAddNewPage)
  }
}
