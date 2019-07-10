import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer/api-customer';
import Utils from '../../utils/utils';

/**
 * Generated class for the CalloutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-callout',
  templateUrl: 'callout.html',
})
export class CalloutPage {

  khach_hang_xe_id: number
  customer = {
    full_name: '',
    phone: '',
    birthday: '',
    bike_name: ''
  }
  callout = {
    khach_hang_xe_id: '',
    y_kien_mua_xe_id: '',
    ket_qua_goi_ra_id: '',
    note: '',
    book_date: ''
  }
  opinion_list:any
  call_result_list:any
  isLoading:boolean = false
  maxSelectableDate: string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController) {
      this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      this.callout.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      let curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() + 5)
      this.maxSelectableDate = curDate.toISOString().substring(0, 10)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalloutPage ' + this.khach_hang_xe_id);
    this.isLoading = true

    this.apiCategory.getBuyOpinions().then(data => {
      this.opinion_list = data
      return 'OK'
    }).then(msg => {
      return this.apiCustomer.getCustomerBikeInfo(this.khach_hang_xe_id).then((data:any) => {
        this.customer = data
      })
    }).then(data => {
      return this.apiCategory.getCallResults().then(data => {
        this.call_result_list = data
      })
    })
    .then(data => {
      this.isLoading = false
    }).catch(err => {
      console.log("Error on CalloutPage:>>", err);  
      this.isLoading = false
    })
  }

  onSaveCallout() {
    console.log(this.callout);

    let loading = Utils.showLoading(this.loadingCrtl)

    this.apiCustomer.addCallout(this.callout).then((data:any) => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        this.navCtrl.pop()
      })
    }).catch(err => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    })   
  }
}