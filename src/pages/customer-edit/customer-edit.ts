import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-edit',
  templateUrl: 'customer-edit.html',
})
export class CustomerEditPage {

  khach_hang_id: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerEditPage');
    this.khach_hang_id = this.navParams.data.khach_hang_id
  }

  onSaveCustomer() {
    this.navCtrl.pop()
  }
}
