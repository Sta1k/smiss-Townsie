import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Database {

  public constructor(public storage: Storage) {

   }
  
    writeRemember(uname, pass, remember) {
      this.storage.set('name', uname);
      this.storage.set('pass', pass);
      this.storage.set('remember', remember);
    }
    getName() {
      return this.storage.get('name')
    }
    getPass() {
      return this.storage.get('pass')
    }
    checkRemember() {
      return this.storage.get('remember')
    }
    delRemember() {
      this.storage.set('remember', false);
    }
    getToken(){
      return this.storage.get('token')
    }
    setToken(auth){
      return this.storage.set('token',auth)
    }
  }