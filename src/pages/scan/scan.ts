import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiProvider } from '../../providers/api/api'
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public api: ApiProvider, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }
  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData)
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
      console.log(err)
    });
  }
  getData() {
    this.api.getMe()
      .subscribe(res => console.log(res))
      
  }
}
