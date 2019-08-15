import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import Utils from '../../utils/utils';
import AppConfig from '../../config/app-config';

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
    bike_name: '',
    book_date: '',
    service_name: '',
    is_free: ''
  }
  callout = {
    khach_hang_xe_id: '',
    ket_qua_goi_ra_id: '',
    muc_dich_goi_ra_id: '',
    note: '',
    book_date: ''
  }
  call_result_list:any
  call_out_purposes: any[]
  isLoading:boolean = false
  maxSelectableDate: string
  dich_vu_list: [any]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController,
    public toast: ToastController) {
      this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      this.callout.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      let curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() + 5)
      this.maxSelectableDate = curDate.toISOString().substring(0, 10)
  }

  ionViewDidLoad() {
    this.isLoading = true

    this.apiCustomer.getCustomerBikeInfo(this.khach_hang_xe_id).then((data:any) => {
      this.customer = data
    }).then(data => {
      return this.apiCategory.getCallResults().then(data => {
        this.call_result_list = data
      })
    }).then(msg => {
      return this.apiCategory.getServiceTypes().then((data: any) => {
        this.dich_vu_list = data
      })
    }).then(msg => {
      return this.apiCategory.getCalloutPurposes().then((data: any) => {
        this.call_out_purposes = data
      })
    })
    .then(data => {
      this.isLoading = false
    }).catch(err => {
      this.isLoading = false
    })
  }

  onSaveCallout() {
    if (!this.callout.muc_dich_goi_ra_id) {
      Utils.showToast(this.toast, "Bạn phải Chọn mục đích gọi ra")
      return
    }

    if (!this.callout.ket_qua_goi_ra_id) {
      Utils.showToast(this.toast, "Bạn phải Chọn kết quả gọi ra")
      return
    }

    let loading = Utils.showLoading(this.loadingCrtl)

    this.apiCustomer.addCallout(this.callout).then((data:any) => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        this.navCtrl.popToRoot()
      })
    }).catch(err => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    })
  }

  onCallPhone(phone) {
    window.open(AppConfig.baseUrl3C + phone,'_system', 'location=yes');
  }
}
