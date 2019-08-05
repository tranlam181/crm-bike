import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import Utils from '../../utils/utils';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import EVENTS from '../../config/EVENTS';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {user_name: '', password: ''}
  isLoading: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private apiAuthenticate: ApiAuthenticateProvider,
    private event: Events) {
  }

  ionViewDidLoad() {
  }

  onLogin() {
    if (!this.user.user_name || !this.user.password) {
      Utils.showToast(this.toast, "Tên đăng nhập và mật khẩu là bắt buộc")
      return
    }

    this.isLoading = true

    this.apiAuthenticate.login(this.user).then((data: any) => {
        // thuc hien reload menu
        this.event.publish(EVENTS.USER_LOG_CHANGED)
        // thuc hien redirect -> home
        this.navCtrl.setRoot(HomePage)
        // close loading
        this.isLoading = false
    }).catch(err => {
      this.isLoading = false
      Utils.showToast(this.toast, err.error.msg)
    })
  }
}
