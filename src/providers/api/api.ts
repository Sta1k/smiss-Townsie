import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataProvider } from '../data/data';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private getAuthCookie = 'http://townsie.smiss.ua/api/get_nonce/?controller=user&method=register'
  private url = 'http://townsie.smiss.ua/wp-json/jwt-auth/v1/token';
  private coords = 'http://townsie.smiss.ua/wp-json/wp/v2/users/';
  private idUrl = 'http://townsie.smiss.ua/wp-json/wp/v2/users/me'
  public regUrl = 'http://townsie.smiss.ua/api/user/register/?insecure=cool&username=art&email=art@domain.com&nonce=b558cec15e&display_name=Art';
  private api2='http://townsie.smiss.ua/api/auth/generate_auth_cookie/?insecure=cool';
  private nonce= 'http://townsie.smiss.ua/api/'
  constructor(public http: Http, public data: DataProvider) {
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

    body.set("password", req.password);
    body.set("username", req.username);
    body.set("rememberme", req.remember || true);
let str=`username=${req.username}&password=${req.password}`
    return this.http.get(this.api2+str, options)//.map(res=>res.json())
  }
  getRegForm(){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': '*/*',
  
    })
    return this.http.get(this.getAuthCookie)//.map(res=>res.json())
  }
  register(req) {
    console.log('Request to api', req);
    let headers = new Headers({
      'Accept': '*/*',
      'Cache-Control': 'max-age=0' 
      // 'Upgrade-Insecure-Requests':'1'
    }),
      options = new RequestOptions({ headers: headers }),
      fd = new FormData();
    fd.set("signup_username", req.username);
    fd.set("signup_email", req.email);
    fd.set("signup_password", req.password);
    fd.set("signup_password_confirm", req.password);
    fd.set("field_1", req.name);
    fd.set("field_1_visibility", req.cansee);
    fd.set("signup_profile_field_ids", '1');
    fd.set("signup_submit", 'Complete Sign Up');
    fd.set("_wpnonce", '');
    fd.set("_wp_http_referer", '\/register\/');

    return this.http.post(this.regUrl, fd, options)//.map(res=>res.json())
  }
  postCoordinates(req) {
    console.log('postCoordinates to api', req);
    let headers = new Headers({
      "Authorization": "Bearer " + this.data.token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }),
      options = new RequestOptions({ headers: headers }),
      body = new URLSearchParams();

    body.set("geolocation", req);

    let id = this.data.id;
    console.log(id)
    return this.http.post(this.coords + id, body.toString(), options)//.map(res=>res.json())
  }

  postCode(req) {
    console.log('Request to api', req);
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }),
      options = new RequestOptions({ headers: headers }),
      body = new URLSearchParams();
    body.set("barcode", req.text);
    let id = this.data.id;
    return this.http.post(this.coords+id, body.toString(), options)//.map(res=>res.json())
  }
  getMe() {
    let headers = new Headers({
      "Authorization": "Bearer " + this.data.token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }),
      options = new RequestOptions({ headers: headers })
    return this.http.get(this.idUrl, options)
  }
}
