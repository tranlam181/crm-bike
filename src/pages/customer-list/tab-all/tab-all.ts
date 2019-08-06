import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, App, AlertController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';
import { CustomerAddNewPage } from '../../customer-add-new/customer-add-new';
import Utils from '../../../utils/utils';

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

  customers: any[]
  filterCustomers: any
  searchCustomerString: string = ''
  isSearching: boolean = false
  searchString: string = ''

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App,
    public alertCtrl: AlertController) {
      // events.subscribe(EVENTS.TAB_NEED_RELOAD, (tabNameNeedReload, time) => {
      //   if (tabNameNeedReload == TabAllPage.name) {
      //     this._searchCustomer(this.searchString)
      //     console.log('subscribe ' + EVENTS.TAB_NEED_RELOAD, tabNameNeedReload, time);
      //   }
      // })
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter() {
    if (this.searchString && this.searchString.length > 2) {
      this._searchCustomer(this.searchString)
    } else {
      this._load()
    }
  }

  ionViewWillUnload() {
    // this.events.unsubscribe(EVENTS.CUSTOMER_EDITED)
  }

  _load() {
    this.isSearching = true
    this.apiCustomer.getCustomers().then((data: any[]) => {
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

  showDetailCustomer(ev, customer) {
    this.navCtrl.push(CustomerDetailPage, {khach_hang_id: customer.id});
  }

  onDelCustomer(ev, customer) {
    Utils.showConfirmAlert(this.alertCtrl, 
      "Thông báo", 
      "Bạn có đồng ý xóa Khách hàng này ? " + customer.full_name, 
      () => {
        let foundIdx = this.customers.indexOf(customer)
        this.customers.splice(foundIdx, 1)
        this.apiCustomer.delCustomer(customer.id)
      })
  }

  onAddCustomer(ev) {
    this.navCtrl.push(CustomerAddNewPage)
    // this.app.getRootNav().setRoot(CustomerAddNewPage)
  }
}
