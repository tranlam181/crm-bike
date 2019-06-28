import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCustomerProvider } from '../../providers/api-customer/api-customer';
import { CustomerDetailPage } from '../customer-detail/customer-detail';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  users: any
  filterUsers: any
  searchCustomerString: string = ''

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Đang tải...',
      duration: 5000        
    })
    loading.present()
    loading.setContent("Another One Bites the Dust");
    this._getUsers().then(data => {
      loading.dismiss()
    })
  }

  _getUsers() {
    return this.apiCustomer.getUsers().then(data => {
      console.log(data);
      this.users = data
      this.filterUsers = data
    })
  }

  _resetFilterUsers() {
    this.filterUsers = [...this.users]
  }

  searchCustomer(ev) {
    // Reset items back to all of the items
    this._resetFilterUsers()

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterUsers = this.users.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  callCustomer(ev, user) {
    console.log(ev);
    console.log(user);
  }

  smsCustomer(ev, user) {
    console.log(ev);
    console.log(user);
  }

  showDetailCustomer(ev, user) {
    console.log(ev);
    console.log(user);
    this.navCtrl.push(CustomerDetailPage, {user: user});
  }
}
