import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import Utils from "../../utils/utils";
import { CustomerDetailPage } from '../customer-detail/customer-detail';
import { CustomerListPage } from '../customer-list/customer-list';
import { ApiAuthenticateProvider } from '../../providers/api-authenticate';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CustomerAddNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-add-new',
  templateUrl: 'customer-add-new.html',
})
export class CustomerAddNewPage {
  customer = {
    full_name: '',
    province_code: '',
    district_code: '',
    precinct_code: '',
    phone: '',
    birthday: '',
    bike_type_id: '',
    shop_id: '',
    bike_number: '',
    buy_date: '',
    sex: ''
  }
  province_list: any
  district_list: any
  precinct_list: any
  bike_type_list: any
  shop_list: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private apiAuthenticate: ApiAuthenticateProvider,
    private app: App) {
  }

  async ionViewCanEnter() {
    let ok = await this.apiAuthenticate.checkLoggedIn()
    if (!ok) {
      setTimeout(() => this.app.getRootNavs()[0].setRoot(LoginPage))
    }
    return ok
  }

  ionViewDidLoad() {
    let loading = Utils.showLoading(this.loadingCtrl) //this._showLoading()
    this.apiCategory.getProvinces().then(data => {
      this.province_list = data
      return "OK"
    }).then(msg => {
      return this.apiCategory.getBikeTypes().then(data => {
        this.bike_type_list = data
      })
    }).then(msg => {
      return this.apiCategory.getShops().then(data => {
        this.shop_list = data
      })
    }).then(msg => {
      let curDate = new Date()
      let formatedDate = curDate.toISOString().substring(0, 10)
      this.customer.buy_date = formatedDate
      this.customer.shop_id = this.apiAuthenticate.userInfo.cua_hang_id ? this.apiAuthenticate.userInfo.cua_hang_id : this.customer.shop_id
      return "OK"
    }).then(msg => {
      loading.dismiss()
    }).catch(err => {
      loading.dismiss()    
    })
  }

  addNewCustomer() {
    let loading = Utils.showLoading(this.loadingCtrl) //this._showLoading()
    this.apiCustomer.addCustomer(this.customer).then((data:any) => {
      loading.dismiss()
      // Utils.showToast(this.toastCtrl, data.msg) //this._showToast(data.msg)
      // Tại sao lại có chỗ này ?
      // Vì có 2 con đường đi đến view detail
      // 1. menu > add new > detail
      // 2. menu > tab all > add > detail
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        if (this.navCtrl.canGoBack()) {
          this.navCtrl.pop({animate: false})
          this.navCtrl.push(CustomerDetailPage, {khach_hang_id: data.khach_hang_id})
        } else {
          this.navCtrl.setRoot(CustomerListPage, {}, {animate: false})
          this.navCtrl.push(CustomerDetailPage, {khach_hang_id: data.khach_hang_id})
        }
      })
    }).catch(err => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message)
    })
  }

  onChangeProvince(val) {
    this.district_list = [{district_code:'', name:'Đang tải...'}]
    this.apiCategory.getDistricts(val).then(data => {
      this.district_list = data
      this.precinct_list = []
    })
  }

  onChangeDistrict(val) {
    this.precinct_list = [{precinct_code:'', name:'Đang tải...'}]
    this.apiCategory.getPrecincts(this.customer.province_code, val).then(data => {
      this.precinct_list = data
    })
  }
}
