import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category/api-category';

/**
 * Generated class for the CustomerAddNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    bike_type_id: ''
  }
  province_list: any
  district_list: any
  precinct_list: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAddNewPage');
    let loading:any = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Đang tải...',
      duration: 5000
    })
    loading.present()
    this.apiCategory.getProvinces().then(data => {
      this.province_list = data
      loading.dismiss()
    })
  }

  addNewCustomer() {
    console.log('addNewCustomer');
    console.log(this.customer);
  }

  onChangeProvince(val) {
    console.log(val);
    this.district_list = [{district_code:'', name:'Đang tải...'}]
    this.apiCategory.getDistricts(val).then(data => {
      this.district_list = data
      this.precinct_list = []
    })
  }

  onChangeDistrict(val) {
    this.precinct_list = [{precinct_code:'', name:'Đang tải...'}]
    this.apiCategory.getPrecincts(this.customer.province_code, val).then(data => {
      console.log(data);
      this.precinct_list = data
    })
  }
}
