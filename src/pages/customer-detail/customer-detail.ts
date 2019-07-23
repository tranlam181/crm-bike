import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import EVENTS from '../../config/EVENTS';
import { ApiCustomerProvider } from '../../providers/api-customer';
import Utils from '../../utils/utils';
import { Customer } from '../../interfaces/customer';
import { CustomerEditPage } from '../customer-edit/customer-edit';
import { MaintancePage } from '../maintance/maintance';
import { CalloutPage } from '../callout/callout';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  khach_hang_id: any
  customer: Customer = {
    district: '',
    full_name: '',
    id: 0,
    phone: '',
    precinct: '',
    province: '',
    sex: ''
  }
  maintances: any
  bikes:any
  isLoading:boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
      
  }

  ionViewDidLoad() {
    this.khach_hang_id =  this.navParams.data.khach_hang_id
    this.isLoading = true

    this.apiCustomer.getCustomer(this.khach_hang_id).then((data:any) => {
      this.customer = data
      return 'OK'
    }).then(msg => {
      return this.apiCustomer.getCustomerBikes(this.khach_hang_id).then(data => {
        this.bikes = data
      })
    }).then(msg => {
      return this.apiCustomer.getCustomerMaintances(this.khach_hang_id).then(data => {
        this.maintances = data
      })
    }).then(data => {
      this.isLoading = false
    }).catch (err => {
      this.isLoading = false
    })
  }

  onEditCustomer(ev) {
    console.log('Publish event '+ EVENTS.CUSTOMER_EDITED);
    this.events.publish(EVENTS.CUSTOMER_EDITED, this.khach_hang_id, Date.now());
    this.navCtrl.push(CustomerEditPage, {khach_hang_id: this.khach_hang_id})
  }

  onMaintance(khach_hang_xe_id) {
    this.navCtrl.push(MaintancePage, {khach_hang_xe_id: khach_hang_xe_id})
  }

  onCallout(khach_hang_xe_id) {
    this.navCtrl.push(CalloutPage, {khach_hang_xe_id: khach_hang_xe_id})
  }
}
