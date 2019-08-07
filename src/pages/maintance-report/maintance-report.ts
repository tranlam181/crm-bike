import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MaintanceReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-maintance-report',
  templateUrl: 'maintance-report.html',
})
export class MaintanceReportPage {

  constructor(public navCtrl: NavController, 
    public apiAuthenticate: ApiAuthenticateProvider,
    public app: App,
    public navParams: NavParams) {
  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintanceReportPage');
  }

}
