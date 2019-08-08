import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppConfig from '../config/app-config';
import { ApiAuthenticateProvider } from './api-authenticate';

/*
  Generated class for the ApiCustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCustomerProvider {

  baseUrl = AppConfig.baseUrl
  headers: any

  constructor(public http: HttpClient,
    private apiAuthenticate: ApiAuthenticateProvider) {
      this.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'        
      }
  }

  addCustomer(customer) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/customers',
          JSON.stringify(customer),
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  delCustomer(khach_hang_id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + '/customers/' + khach_hang_id,
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  getCustomers(filter?, s?) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers?filter=' + filter + '&s=' + s,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
        // {headers: {...this.headers}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomer(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        (data);
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerMaintances(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id + '/maintances', 
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerBikes(khach_hang_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/' + khach_hang_id + '/bikes',
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerBikeInfo(khach_hang_xe_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers-bikes/' + khach_hang_xe_id,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCustomerMaintanceInfo(bao_duong_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/customers/maintances/' + bao_duong_id,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getMaintanceDetails(bao_duong_id) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/maintances/' + bao_duong_id + '/details',
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  reportCallout(type, date_sta, date_end) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + `/report-callouts?type=${type}&date_sta=${date_sta}&date_end=${date_end}`,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  reportMaintance(type, date_sta, date_end) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + `/report-maintances?type=${type}&date_sta=${date_sta}&date_end=${date_end}`,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  exportCustomer(type) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + `/export-customers?type=${type}`,
        {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
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
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
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
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }

  addSchedule(schedule) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + `/maintances/${schedule.bao_duong_id}/schedules`,
          JSON.stringify(schedule),
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}          
      ).subscribe(data => {
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
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
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
          {headers: {...this.headers, 'Authorization': this.apiAuthenticate.token}}
      ).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}
