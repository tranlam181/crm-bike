import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomerListPage } from '../customer-list/customer-list';
import { CustomerAddNewPage } from '../customer-add-new/customer-add-new';
import { CustomerImportPage } from '../customer-import/customer-import';

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
      case 'CustomerImportPage':
        this.navCtrl.setRoot(CustomerImportPage)
        break;
      default:
        break;
    }    
  }
}
