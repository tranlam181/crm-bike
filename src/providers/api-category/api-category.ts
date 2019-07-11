import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppConfig from '../../config/app-config';

/*
  Generated class for the ApiCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCategoryProvider {

  baseUrl = AppConfig.baseUrl

  constructor(public http: HttpClient) {
  }

  getProvinces() {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/provinces').subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getDistricts(province_code: string) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/districts/' + province_code).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getPrecincts(province_code: string, district_code: string) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/precincts/' + province_code + '/' + district_code).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getBikeTypes() {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/bike-types').subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getShops() {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/shops').subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getBuyOpinions() {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/buy-opinions').subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getCallResults() {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/call-results').subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }

  getMaintanceTypes(filter?) {
    return new Promise((resolve, reject) => {
      // http get
      this.http.get(this.baseUrl + '/category/maintance-types?filter=' + filter).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err.message)
      })
    })
  }
}
