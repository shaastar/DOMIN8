import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redirect-instagram',
  templateUrl: './redirect-instagram.page.html',
  styleUrls: ['./redirect-instagram.page.scss'],
})
export class RedirectInstagramPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  cancelButton() {
    this.location.back();
  }
  continueButton() {
    // this should use instagram link also
    this.location.back();
  }
}
