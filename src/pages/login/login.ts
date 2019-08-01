import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import Utils from '../../utils/utils';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';

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
    private apiAuthenticate: ApiAuthenticateProvider) {
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

    this.apiAuthenticate.login(this.user).then((data: any) => {
      console.log(data);
      this.apiAuthenticate.saveToken(data.token, data.user).then(res => {
        // thuc hien reload menu
        // thuc hien redirect -> home
      })
    }).catch(err => {
      console.log(err);
    })
  }
}
