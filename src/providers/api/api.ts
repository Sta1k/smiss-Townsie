import { Headers, Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private url = 'http://app.townsie.com/';
  private apitale = 'wp-json/wp/v2/'
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }
  login(req) {
    console.log('Request to api', req);
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }),
      options = new RequestOptions({ headers: headers }),
      body = new URLSearchParams();

    body.set("pwd", req.pwd);
    body.set("log", req.log);
    body.set("rememberme", req.remember || true);

    return this.http.post(this.url + 'login', body.toString(), options)//.map(res=>res.json())
  }
  getMe() {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }),
      options = new RequestOptions({ headers: headers })
    return this.http.get(this.url + this.apitale + 'users/me', options)
  }
}
