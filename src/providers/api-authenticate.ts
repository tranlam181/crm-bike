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

  private userInfoKey = "userInfo"
  public userInfo: any
  private isLoggedIn: boolean = false
  private isReadStorage: boolean = false
  baseUrl = AppConfig.baseUrlAuth

  constructor(public http: HttpClient,
    private storage: Storage) {

    console.log('Hello ApiAuthenticateProvider Provider');
  }

  _resetReadState() {
    this._setReadState(false)
  }

  _getReadState() {
    return this.isReadStorage
  }

  _setReadState(isReadToken: boolean) {
    this.isReadStorage = isReadToken
  }

  _readToken() {
    return this.storage.get(this.userInfoKey).then(result => {
      this._setReadState(true)
      this.userInfo = result
      this.isLoggedIn = result ? true : false
      return this.isLoggedIn
    })
  }

  saveToken(userInfo) {
    return this.storage.set(this.userInfoKey, userInfo)
      .then(res => this._resetReadState())
  }

  async checkLoggedIn() {
    if (this._getReadState()) {
      return this.isLoggedIn
    } else {
      return await this._readToken()
    }
  }

  logout() {
    return this.storage.clear().then(res => {
      this._resetReadState()
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
