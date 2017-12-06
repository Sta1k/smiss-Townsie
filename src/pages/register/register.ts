import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  regObj = {
    username: '',
    password: '',
    email: '',
    name: '',
    cansee: 'public',
    nonce: ''
  }
  br;
  constructor(private app: App, private iab: InAppBrowser, public api: ApiProvider, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
   
  }
  closeIAB() {
   
  }
  register() {

    console.log(this.regObj)
    this.presentToast('Start register')
    this.api.register(this.regObj)
      .subscribe(res => console.log(res))
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
