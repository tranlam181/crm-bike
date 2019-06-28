import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiCustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCustomerProvider {
  baseUrl = 'https://jsonplaceholder.typicode.com'

  constructor(public http: HttpClient) {
    console.log('Hello ApiCustomerProvider Provider');
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }
}
