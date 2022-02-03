import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  backBtn() {
    this.location.back();
  }
}
