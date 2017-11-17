import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(e: Event, login) {
    console.log(login)
    e.preventDefault();
    // let user = new Object(this.username, this.password, this.remember);
    this.api.login(login)
      .toPromise()
      // .then(res => result = res.json())
      .then(result => console.log(result))
    //.subscribe((event) => event.json())

  }

}
