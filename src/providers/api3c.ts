import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import AppConfig from "../config/app-config";

/*
  Generated class for the Api3cProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Api3cProvider {
  headers: any;

  constructor(public http: HttpClient) {
    this.headers = {
      "Content-Type": "application/json"
    };
  }

  /**
   *
   * @param startDate 2020-07-30T00:00:00Z
   * @param endDate 2020-07-31T00:00:00Z
   * @param callType 1:goi ra, 0: goi vao
   */
  get3CCallHistory(startDate, endDate, callType) {
    return this.http
      .get(
        `https://3c-web1.mobifone.vn/${AppConfig.hotline3C}/api/v1/calls?start_time_since=${startDate}&start_time_to=${endDate}&call_type=${callType}`,
        {
          headers: {
            ...this.headers,
            Authorization: `Bearer ${AppConfig.secret3C}`,
          },
        }
      )
      .toPromise();
  }
}
