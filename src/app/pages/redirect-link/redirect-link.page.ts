import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redirect-link',
  templateUrl: './redirect-link.page.html',
  styleUrls: ['./redirect-link.page.scss'],
})
export class RedirectLinkPage implements OnInit {
  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  cancelButton() {
    this.location.back();
  }
  continueButton() {
    // this should use link also
    var url = 'https://linktr.ee/domin5.3';
    window.open(url);
    this.router.navigate(['tabs/main-menu']);
    // this.location.back();
  }
}
