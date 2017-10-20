import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public red = 0;
  public green = 0;
  public blue = 0;
  private host = 'http://192.168.0.6:6085/color';
  constructor(public navCtrl: NavController, private http: Http) {

  }

  onSliderChanged(){
    this.http.post(this.host, {red: this.red, green: this.green, blue: this.blue}).toPromise().then( res => {})
    console.log(`RGB: (${this.red}, ${this.green}, ${this.blue})`);
  }

  getRGB(){
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

}
