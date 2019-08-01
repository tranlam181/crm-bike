import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private apiAuthenticate: ApiAuthenticateProvider,
    private event: Events,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    console.log(this.user);
    if (!this.user.user_name || !this.user.password) {
      Utils.showToast(this.toast, "Tên đăng nhập và mật khẩu là bắt buộc")
      return
    }

    let loading = Utils.showLoading(this.loadingCtrl, "Đang đăng nhập...")

    this.apiAuthenticate.login(this.user).then((data: any) => {
      let userInfo = {token: data.token, user: data.user}

      this.apiAuthenticate.saveToken(userInfo).then(res => {
        // thuc hien reload menu
        this.event.publish(EVENTS.USER_LOG_CHANGED)
        // thuc hien redirect -> home
        this.navCtrl.setRoot(HomePage)
        // close loading
        loading.dismiss()
      })
    }).catch(err => {
      loading.dismiss()
      console.log(err);
    })
  }
}
