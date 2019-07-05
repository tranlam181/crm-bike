import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabComingPage } from './tab-coming/tab-coming';
import { TabPassivePage } from './tab-passive/tab-passive';
import { TabBirthdayPage } from './tab-birthday/tab-birthday';
import { TabAllPage } from './tab-all/tab-all';

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  tabComing: any
  tabPassive: any
  tabBirthday: any
  tabAll: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      this.tabComing = TabComingPage
      this.tabPassive = TabPassivePage
      this.tabBirthday = TabBirthdayPage
      this.tabAll = TabAllPage
  }
}
