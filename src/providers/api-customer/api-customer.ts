import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiCustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiCustomerProvider {
  baseUrl = 'http://localhost:9191/api/crm'

  constructor(public http: HttpClient) {
    console.log('Hello ApiCustomerProvider Provider');
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
}
