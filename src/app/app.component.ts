import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';
import { CustomerImportPage } from '../pages/customer-import/customer-import';
import { LogoutPage } from '../pages/logout/logout';
import { ApiAuthenticateProvider } from '../providers/api-authenticate';
import { LoginPage } from '../pages/login/login';
import EVENTS from '../config/EVENTS';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  logInPage: {title: string, component: any, icon: string};
  isLoggedIn: boolean = false
  userInfo: any

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public menuCtrl: MenuController,
    private apiAuthenticate: ApiAuthenticateProvider,
    private event: Events ) {

    event.subscribe(EVENTS.USER_LOG_CHANGED, () => {
      this._load()
    })

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

  ngOnDestroy() {
    this.event.unsubscribe(EVENTS.USER_LOG_CHANGED)
  }

  _load() {
    console.log('Run ham app@_load()');

    this.apiAuthenticate.checkLoggedIn().then(ok => {
      this.isLoggedIn = ok
      if (ok) {
        this.userInfo = this.apiAuthenticate.userInfo
      }
      console.log(this.userInfo);

    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this._load()
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
