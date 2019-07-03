import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import EVENTS from '../../providers/EVENTS';

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {
  user: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.user =  navParams.data.user   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  onEditCustomer(ev) {
    console.log('Click edit customer');
    this.events.publish(EVENTS.CUSTOMER_EDITED, this.user, Date.now());
  }
}
