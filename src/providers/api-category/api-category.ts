import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiCategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCategoryProvider {

  fakeProvinceList = [
    {province_code: 'QTR', name: 'Quảng Trị'},
    {province_code: 'TTH', name: 'Thừa Thiên Huế'},
    {province_code: 'DNA', name: 'Đà Nẵng'},
    {province_code: 'QNA', name: 'Quảng Nam'}
  ]

  fakeDistrictList = [
    {district_code: 'Q1', name: 'Quận 1'},
    {district_code: 'Q2', name: 'Quận 2'},
    {district_code: 'Q3', name: 'Quận 3'}
  ]

  fakePrecinctList = [
    {precinct_code: 'P1', name: 'Phường 1'},
    {precinct_code: 'P2', name: 'Phường 2'},
    {precinct_code: 'P3', name: 'Phường 3'}
  ]

  constructor(public http: HttpClient) {
    console.log('Hello ApiCategoryProvider Provider');
  }

  getProvinces() {
    return new Promise(resolve => {
      // http get
      resolve(this.fakeProvinceList)
    })
  }

  getDistricts(province_code: string) {
    return new Promise(resolve => {
      // http get
      resolve(this.fakeDistrictList)
    })
  }

  getPrecincts(province_code: string, district_code: string) {
    return new Promise(resolve => {
      // http get
      resolve(this.fakePrecinctList)
    })
  }
}
