import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppConfig from '../config/app-config';

/*
  Generated class for the ApiCustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCustomerProvider {

  baseUrl = AppConfig.baseUrl

  constructor(public http: HttpClient) {
  }

  addCustomer(customer) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/customers',
          JSON.stringify(customer),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  getCustomers(filter?, s?) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers?filter=' + filter + '&s=' + s).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomer(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id).subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerMaintances(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id + '/maintances').subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerBikes(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id + '/bikes').subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerBikeInfo(khach_hang_xe_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers-bikes/' + khach_hang_xe_id).subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerMaintanceInfo(bao_duong_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/maintances/' + bao_duong_id).subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getMaintanceDetails(bao_duong_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/maintances/' + bao_duong_id + '/details').subscribe(data => {
        console.log(data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  updateFeedbackAfterBuy(feedback) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + `/customers/bikes/${feedback.khach_hang_xe_id}`,
          JSON.stringify(feedback),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  updateFeedbackAfterMaintance(feedback) {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + `/maintances/${feedback.bao_duong_id}`,
          JSON.stringify(feedback),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  addCallout(callout) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + `/customers-bikes/${callout.khach_hang_xe_id}/callouts`,
          JSON.stringify(callout),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  addMaintance(maintance) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + `/customers-bikes/${maintance.khach_hang_xe_id}/maintances`,
          JSON.stringify(maintance),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}
