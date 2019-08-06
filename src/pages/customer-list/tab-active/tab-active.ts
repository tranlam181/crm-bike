import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../../providers/api-customer';
import { CustomerDetailPage } from '../../customer-detail/customer-detail';
import Utils from '../../../utils/utils';

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
    public apiCustomer: ApiCustomerProvider  ,
    public alertCtrl: AlertController) {
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

  ionViewDidEnter() {
    this._load()
  }
  
  // ionViewDidLoad() {
  //   this._load()
  // }

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
  
  onRefresh(refresher) {
    this._load().then(data => {
      refresher.complete();
    })
  }	
}
