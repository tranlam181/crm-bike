import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import EVENTS from '../../config/EVENTS';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: ApiAuthenticateProvider,
    private event: Events) {
  }

  ionViewDidLoad() {
    this.auth.logout().then(res => {
      this.event.publish(EVENTS.USER_LOG_CHANGED)
      this.navCtrl.setRoot(LoginPage)
    })
  }

}
