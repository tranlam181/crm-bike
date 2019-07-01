import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCategoryProvider {

  baseUrl = 'http://localhost:9191/api/crm'
  
  fakeProvinceList:any
  fakeDistrictList: any
  fakePrecinctList:any

  constructor(public http: HttpClient) {
    console.log('Hello ApiCategoryProvider Provider');
  }

  getProvinces() {
    return new Promise(resolve => {
      // http get
      this.http.get(this.baseUrl + '/category/provinces').subscribe(data => {
        this.fakeProvinceList = data
        resolve(this.fakeProvinceList)
      })
    })
  }

  getDistricts(province_code: string) {
    return new Promise(resolve => {
      // http get
      this.http.get(this.baseUrl + '/category/districts/' + province_code).subscribe(data => {
        this.fakeDistrictList = data
        resolve(this.fakeDistrictList)
      })
    })
  }

  getPrecincts(province_code: string, district_code: string) {
    return new Promise(resolve => {
      // http get
      this.http.get(this.baseUrl + '/category/precincts/' + province_code + '/' + district_code).subscribe(data => {
        this.fakePrecinctList = data
        resolve(this.fakePrecinctList)
      })
    })
  }
}
