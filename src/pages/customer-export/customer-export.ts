import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiCustomerProvider } from '../../providers/api-customer';

/**
 * Generated class for the CustomerExportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-export',
  templateUrl: 'customer-export.html',
})
export class CustomerExportPage {

  isLoading: boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apiCustomer: ApiCustomerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerExportPage');
  }

  onExportActive() {
    this.apiCustomer.exportCustomer("all").then(data => {
      console.log(data);
      
    })
  }

  onExportPassive() {

  }

  onExportAll() {

  }
}
