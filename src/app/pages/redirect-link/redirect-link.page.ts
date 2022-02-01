import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-redirect-link',
  templateUrl: './redirect-link.page.html',
  styleUrls: ['./redirect-link.page.scss'],
})
export class RedirectLinkPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  cancelButton(){
    this.location.back();
  }
  continueButton(){
    // this should use link also
    this.location.back();
  }
}
