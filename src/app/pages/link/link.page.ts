import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  backBtn() {
    this.location.back();
  }
}
