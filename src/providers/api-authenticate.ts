import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import AppConfig from '../config/app-config';

/*
  Generated class for the ApiAuthenticateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiAuthenticateProvider {

  public isLoggedIn: boolean = false
  private isReadStorage: boolean = false
  baseUrl = AppConfig.baseUrlAuth

  constructor(public http: HttpClient,
    private storage: Storage) {

    console.log('Hello ApiAuthenticateProvider Provider');
  }

  _readToken() {
    return this.storage.get("token").then(token => {
      this.isReadStorage = true
      this.isLoggedIn = token ? true : false
      return this.isLoggedIn
    })
  }

  saveToken(token, user) {
    return this.storage.set("token", token)
      .then(res => this.storage.set("user", user))
      .then(res => this._readToken())
  }

  async checkLoggedIn() {
    if (this.isReadStorage) {
      return this.isLoggedIn
    } else {
      return await this._readToken()
    }
  }

  logout() {
    this.storage.clear().then(res => {
      return true
    }).catch (err => {
      console.log(err);
      return false
    })
  }

  login(user) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login',
          JSON.stringify(user),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}
