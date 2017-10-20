import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public red = 0;
  public green = 0;
  public blue = 0;
  constructor(public navCtrl: NavController) {

  }

  getRGB(){
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

}
