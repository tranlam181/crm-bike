import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, App } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';
import EVENTS from '../../../config/EVENTS';
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

  customers: any
  filterCustomers: any
  searchCustomerString: string = ''
  isSearching: boolean = false
  searchString: string = ''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App) {
      events.subscribe(EVENTS.TAB_NEED_RELOAD, (tabNameNeedReload, time) => {
        if (tabNameNeedReload == TabAllPage.name) {
          this._searchCustomer(this.searchString)
          console.log('subscribe ' + EVENTS.TAB_NEED_RELOAD, tabNameNeedReload, time);
        }
      })
  }

  ionViewDidLoad() {
    this._load()
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter customerList');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload() customerList');
    this.events.unsubscribe(EVENTS.CUSTOMER_EDITED)
  }

  _load() {
    this.isSearching = true
    this.apiCustomer.getCustomers().then(data => {
      this.customers = data
      this.filterCustomers = data
      this.isSearching = false
    }).catch (err => {
      this.isSearching = false
    })
  }

  _resetFilterUsers() {
    this.filterCustomers = [...this.customers]
  }

  _searchCustomer(s) {
    this.isSearching = true

    this.apiCustomer.getCustomers('', s).then(data => {
      this.filterCustomers = data
      this.isSearching = false
    }).catch (err => {
      this.isSearching = false
    })
  }

  searchCustomer(ev) {
    console.log(this.searchString);
    
    // Reset items back to all of the items
    this._resetFilterUsers()

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (!val || val.length <= 2 || this.isSearching == true) return;

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.filterCustomers = this.customers.filter((item) => {
    //     return (
    //       item.full_name.toLowerCase().indexOf(val.toLowerCase()) > -1
    //       || item.phone.toLowerCase().indexOf(val.toLowerCase()) > -1
    //     );
    //   })
    // }

    this._searchCustomer(val)
  }

  callCustomer(ev, customer) {
  }

  showDetailCustomer(ev, customer) {
    this.navCtrl.push(CustomerDetailPage, {khach_hang_id: customer.id});
  }

  onAddCustomer(ev) {
    this.navCtrl.push(CustomerAddNewPage)
    // this.app.getRootNav().setRoot(CustomerAddNewPage)
  }
}
