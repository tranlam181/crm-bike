import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Trang chủ', component: HomePage, icon: 'home' },
      { title: 'DS Khách hàng', component: CustomerListPage, icon: 'people' },
      { title: 'Thêm Khách hàng', component: CustomerAddNewPage, icon: 'add' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
