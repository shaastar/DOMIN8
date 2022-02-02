import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  constructor() {}
  lang: string = localStorage.getItem('lang');
  ngOnInit() {}

  ionViewWillEnter() {
    this.lang = localStorage.getItem('lang');
  }
}
