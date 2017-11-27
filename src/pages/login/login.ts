import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MapPage } from '../map/map';
import { Database } from "../../providers/db/db"
import { DataProvider } from '../../providers/data/data';
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
    private app: App,
    public data: DataProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public api: ApiProvider,
    private db: Database) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLogin(e: Event) {
    e.preventDefault();
    let result;
    let user = {
      username: this.username,
      password: this.password
    }
    this.api.login(user)
      .toPromise()
      .then(res => result = res.json())
      .then(result => {
        this.db.writeRemember(this.username, this.password, true)
        console.log('Result: ', result)

        result.token
          ?
          this.loggedIn(result)
          :
          this.presentToast('Ooops! Something wrong with server :(')
      })

    //.subscribe((event) => event.json())

  }
  loggedIn(r) {
    let result
    this.data.token = r.token
    this.api.getMe().subscribe(res => {
      result = res.json()
      console.log(result)
      this.data.id = result.id
    })
    this.presentToast(`Logged in as ${r.user_display_name}`)
    this.app.getRootNav().setRoot(MapPage)
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
