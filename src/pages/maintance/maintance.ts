import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController, Events } from 'ionic-angular';
import { ApiCategoryProvider } from '../../providers/api-category';
import { ApiCustomerProvider } from '../../providers/api-customer';
import { IonicSelectableComponent } from 'ionic-selectable';
import Utils from '../../utils/utils';
import { TabComingPage } from '../customer-list/tab-coming/tab-coming';
import EVENTS from '../../config/EVENTS';

/**
 * Generated class for the MaintancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'page-maintance',
  templateUrl: 'maintance.html',
})
export class MaintancePage {

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
  maintance = {
    khach_hang_xe_id: '',
    shop_id: '',
    details: [
      {loai_bao_duong:{}, price:''}
    ]
  }
  maintance_type_list: any
  shop_list: any
  isLoading:boolean = false
  maxSelectableDate: string
  port: Port;
  isSearchMaintanceType: boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apiCategory: ApiCategoryProvider,
    public apiCustomer: ApiCustomerProvider,
    public loadingCrtl: LoadingController,
    public alertCtrl: AlertController,
    public events: Events) {
      this.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      this.maintance.khach_hang_xe_id = navParams.data.khach_hang_xe_id
      let curDate = new Date()
      curDate.setFullYear(curDate.getFullYear() + 5)
      this.maxSelectableDate = curDate.toISOString().substring(0, 10)
  }

  ionViewDidLoad() {
    console.log('MaintancePage khach_hang_xe_id= ' + this.khach_hang_xe_id);
    this.isLoading = true

    this.apiCategory.getMaintanceTypes().then(data => {
      this.maintance_type_list = data
      return 'OK'
    }).then(msg => {
      return this.apiCustomer.getCustomerBikeInfo(this.khach_hang_xe_id).then((data:any) => {
        this.customer = data
      })
    })
    .then(msg => {
      return this.apiCategory.getShops().then(data => {
        this.shop_list = data
      })
    })
    .then(data => {
      this.isLoading = false
    }).catch(err => {
      console.log("Error on MaintancePage: ", err);  
      this.isLoading = false
    })
  }

  onSaveMaintance() {
    console.log(this.maintance);    
    // let tabNameNeedReload = this.navCtrl.first().name;
    let loading = Utils.showLoading(this.loadingCrtl)

    this.apiCustomer.addMaintance(this.maintance).then((data:any) => {
        loading.dismiss()
        Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', data.msg, () => {
        //   this.events.publish(EVENTS.TAB_NEED_RELOAD, tabNameNeedReload, Date.now());
          this.navCtrl.pop()
        })
    }).catch(err => {
      loading.dismiss()
      Utils.showConfirmAlert(this.alertCtrl, 'Thông báo', err.error.message, ()=>{})
    })
  }

  onAddMaintance(ev: Event) {
    // console.log('hello');
    ev.preventDefault()
    this.maintance.details.push({loai_bao_duong:{id:'', name:''}, price: ''})
  }

  onDellMaintance(ev: Event, index) {
    ev.preventDefault()
    console.log(index);
    this.maintance.details.splice(index, 1)
  }

  onMaintanceChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    // console.log('port:', event.value);
  }

  onSearchMaintance(event: {
    component: IonicSelectableComponent,
    text: string
  }) {    
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text || this.isSearchMaintanceType) {
      // event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.isSearchMaintanceType =  true
    this.apiCategory.getMaintanceTypes(text).then((data:any) => {
      event.component.items = data
      event.component.endSearch();
      this.isSearchMaintanceType =  false
    }).catch (err => {
      this.isSearchMaintanceType =  false
    })
  }
}
