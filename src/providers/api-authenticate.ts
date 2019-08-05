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

  private authKey = "authKey"
  public userInfo: any
  public token: any
  private isLoggedIn: boolean = false
  private isReadStorage: boolean = false
  baseUrl = AppConfig.baseUrlAuth

  constructor(public http: HttpClient,
    private storage: Storage) {
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
    return this.storage.get(this.authKey).then(data => {
      this._setReadState(true)
      this.userInfo = data ? data.userInfo : null
      this.token = data ? data.token : null
      this.isLoggedIn = data ? true : false
      return this.isLoggedIn
    })
  }

  async checkLoggedIn() {
    if (this._getReadState() && this.token) {
      return this.isLoggedIn
    } else {
      return await this._readToken()
    }
  }

  saveToken(token, userInfo) {
    return this.storage.set(this.authKey, {token: token, userInfo: userInfo})
      .then(res => this._resetReadState())
  }

  logout() {
    return this.storage.clear().then(res => {
      this._resetReadState()
      return true
    }).catch (err => {
      return false
    })
  }

  login(user) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login',
          JSON.stringify(user),
          {headers: {'Content-Type': 'application/json'}})
      .subscribe(async (data: any) => {
        this._resetReadState()
        await this.saveToken(data.token, data.user)
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}
