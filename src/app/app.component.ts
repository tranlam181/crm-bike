import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';
import { CustomerImportPage } from '../pages/customer-import/customer-import';
import { LogoutPage } from '../pages/logout/logout';
import { ApiAuthenticateProvider } from '../providers/api-authenticate';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  logInPage: {title: string, component: any, icon: string};
  isLoggedIn: boolean = true
  user = {user_name: '', shop_name: ''}

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public menuCtrl: MenuController,
    private apiAuthenticate: ApiAuthenticateProvider ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Trang chủ', component: HomePage, icon: 'home' },
      { title: 'DS Khách hàng', component: CustomerListPage, icon: 'people' },
      { title: 'Thêm Khách hàng', component: CustomerAddNewPage, icon: 'add' },
      { title: 'Import Khách hàng', component: CustomerImportPage, icon: 'cube' },
      { title: 'Thoát', component: LogoutPage, icon: 'log-out' },
    ];

    this.logInPage = { title: 'Đăng nhập', component: LoginPage, icon: 'log-in'}
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.apiAuthenticate.checkLoggedIn().then(ok => {
        this.isLoggedIn = ok
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
