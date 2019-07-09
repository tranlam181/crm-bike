import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MaintancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-maintance',
  templateUrl: 'maintance.html',
})
export class MaintancePage {

  khach_hang_xe_id: number

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintancePage:' + this.khach_hang_xe_id);    
  }

  onSaveMaintance() {
    this.navCtrl.pop()
  }
}
