import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { MapPage } from '../pages/map/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HeadComponent } from '../components/head/head';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../providers/data/data';
import { ScanPage } from '../pages/scan/scan';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DbProvider } from '../providers/db/db';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@NgModule({
  declarations: [
    MyApp,
    ScanPage,
    LoginPage,
    ListPage,
    TabsPage,
    RegisterPage,
    MapPage,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true}),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScanPage,
    LoginPage,
    ListPage,
    TabsPage,
    RegisterPage,
    MapPage
  ],
  providers: [
    InAppBrowser,
    BarcodeScanner,
    Geolocation,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    DataProvider,
    DbProvider
  ]
})
export class AppModule {}
