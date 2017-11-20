import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MapPage } from '../map/map';
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
  username;
  password;
  constructor(
    private app:App,
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams, 
    public api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(e: Event) {
    e.preventDefault();
    let result;
    let user={
      log:this.username,
      pwd:this.password
    }
    this.api.login(user)
      .toPromise()
      //.then(res => result = res.json())
      .then(result =>{
        console.log('Result: ', result)
      result.status===200||result.status===304
      ?
      this.app.getRootNav().setRoot(MapPage)
      :
      this.presentToast('Ooops! Something wrong with server :(')
      })

    //.subscribe((event) => event.json())

  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
