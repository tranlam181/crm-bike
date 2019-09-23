import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';
import Utils from '../../utils/utils';
import AppConfig from '../../config/app-config';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  myForm = {
    link_3c: ''
  }
  isLoading: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiAuthenticate: ApiAuthenticateProvider,
    public app: App,
    public alertCtrl: AlertController) {

  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
  }

  ionViewDidLoad() {
    this.apiAuthenticate.getLink3c().then((data: any) => {
      this.myForm.link_3c = data.link_3c
    })
  }

  onSaveSetting() {
    if (!this.myForm.link_3c)
      return

    this.isLoading = true

    this.apiAuthenticate.saveLink3c(this.myForm).then((data:any) => {
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg)
      AppConfig.baseUrl3C = this.myForm.link_3c
      this.isLoading = false
    }).catch(err => {
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message)
      this.isLoading = false
    })
  }
}
