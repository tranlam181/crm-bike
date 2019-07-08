import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomerListPage } from '../customer-list/customer-list';
import { CustomerAddNewPage } from '../customer-add-new/customer-add-new';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onGoToPage(pageName) {
    switch (pageName) {
      case 'CustomerListPage':
        this.navCtrl.setRoot(CustomerListPage)
        break;
      case 'CustomerAddNewPage':
        this.navCtrl.setRoot(CustomerAddNewPage)
        break;
      default:
        break;
    }    
  }
}
