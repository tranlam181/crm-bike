import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalloutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-callout',
  templateUrl: 'callout.html',
})
export class CalloutPage {

  khach_hang_xe_id: number
  customer = {
    full_name: '',
    phone: '',
    birthday: ''
  }
  callout = {
    y_kien_mua_xe_id: '',
    note: '',
    book_date: ''
  }
  opinion_list:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalloutPage ' + this.khach_hang_xe_id);
  }

  onSaveCallout() {
    console.log(this.callout);
    
    //this.navCtrl.pop()
  }
}
