import { Component } from '@angular/core';

/**
 * Generated class for the HeadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'head',
  templateUrl: 'head.html'
})
export class HeadComponent {

  text: string;

  constructor() {
    console.log('Hello HeadComponent');
    
  }

}
