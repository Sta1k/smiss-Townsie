import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register'
import { MapPage } from '../pages/map/map'
import{ScanPage} from '../pages/scan/scan'
import { Geolocation } from '@ionic-native/geolocation'
import { DataProvider } from '../providers/data/data';
import 'rxjs/add/operator/filter'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ScanPage;
  currentLocation;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public toastCtrl: ToastController, 
    public data:DataProvider,
    private geolocation: Geolocation,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component:TabsPage },
      { title: 'Map', component: MapPage },
      {title: 'Scan', component: ScanPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
     this.getPos();
      let login = LoginPage,
        register = RegisterPage
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
getPos(){
  this.presentToast('App getting your Position')
        let options = {
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options)
        .then((position) => {
            console.log('Geolocation successful');
            this.presentToast('Position saved')
            this.data.position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
    
  }).catch((error) => {
    console.log('Error getting location', error);
  });
 
}
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
