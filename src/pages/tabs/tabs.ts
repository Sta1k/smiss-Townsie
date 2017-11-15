import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  tab1Root: any = LoginPage;
  tab2Root: any = RegisterPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
