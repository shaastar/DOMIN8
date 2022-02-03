import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {
  lang: string = localStorage.getItem('lang');
  constructor(private location: Location) {}

  ngOnInit() {}

  backBtn() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.lang = localStorage.getItem('lang');
  }
}
