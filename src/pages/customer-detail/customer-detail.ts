import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import EVENTS from '../../providers/EVENTS';
import { ApiCustomerProvider } from '../../providers/api-customer/api-customer';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public loadingCtrl: LoadingController,
    public apiCustomer: ApiCustomerProvider) {
      
  }

  ionViewDidLoad() {
    this.khach_hang_id =  this.navParams.data.khach_hang_id
    let loading = Utils.showLoading(this.loadingCtrl)
    this.apiCustomer.getCustomer(this.khach_hang_id).then((data:any) => {
      this.customer = data
      loading.dismiss()
    }).catch (err => {
      console.log("Error on ionViewDidLoad CustomerDetailPage:>>", err);  
      loading.dismiss()
    })
  }

  onEditCustomer(ev) {
    console.log('Publish event '+ EVENTS.CUSTOMER_EDITED);
    this.events.publish(EVENTS.CUSTOMER_EDITED, this.khach_hang_id, Date.now());
    this.navCtrl.push(CustomerEditPage, {khach_hang_id: this.khach_hang_id})
  }

  onMaintance() {
    this.navCtrl.push(MaintancePage)
  }

  onCallout() {
    this.navCtrl.push(CalloutPage)
  }
}
