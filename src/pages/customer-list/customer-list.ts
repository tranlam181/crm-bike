import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabComingPage } from './tab-coming/tab-coming';
import { TabPassivePage } from './tab-passive/tab-passive';
import { TabBirthdayPage } from './tab-birthday/tab-birthday';
import { TabAllPage } from './tab-all/tab-all';
import { TabActivePage } from './tab-active/tab-active';
import { TabAfterBuyDatePage } from './tab-after-buy-date/tab-after-buy-date';
import { TabAfterMaintanceDatePage } from './tab-after-maintance-date/tab-after-maintance-date';

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  tabComing: any
  tabPassive: any
  tabBirthday: any
  tabAll: any
  tabActive: any
  tabAfterBuyDatePage: any
  tabAfterMaintanceDatePage: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      this.tabComing = TabComingPage
      this.tabPassive = TabPassivePage
      this.tabActive = TabActivePage
      this.tabBirthday = TabBirthdayPage
      this.tabAll = TabAllPage
      this.tabAfterBuyDatePage = TabAfterBuyDatePage
      this.tabAfterMaintanceDatePage = TabAfterMaintanceDatePage
  }
}
