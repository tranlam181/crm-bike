import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { CustomerListPage } from '../customer-list/customer-list';
import { CustomerAddNewPage } from '../customer-add-new/customer-add-new';
import { CustomerImportPage } from '../customer-import/customer-import';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private apiAuthenticate: ApiAuthenticateProvider,
    public app: App) {

  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
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
