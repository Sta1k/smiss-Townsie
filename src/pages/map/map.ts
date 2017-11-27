import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data/data';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;

  constructor(
    public api: ApiProvider,
    public toast: ToastController,
    public data: DataProvider,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {
    //this.tabBarElement.style.display = 'none!important';
  }

  ionViewWillLeave() {
    //this.tabBarElement.style.display = 'flex';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    // this.getPos();
    this.loadMap();
  }
  getPos() {
    this.presentToast('App getting your Position')
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options)
      .then((position) => {
        console.log('Geolocation successful');
        this.presentToast('Position saved in user profile')
        this.data.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

      })
      .then(r => {
        console.log(r)
        this.api.postCoordinates(this.data.position.lat + ',' + this.data.position.lng)
          .subscribe(res => console.log(res.json()))
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.data.position.lat || 0,
          lng: this.data.position.lng || 0
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'You',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.data.position.lat || 0,
            lng: this.data.position.lng || 0
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.presentToast('clicked on Marker');
              });
          })
      });
  }
  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
