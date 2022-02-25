import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { AppAvailability } from '@awesome-cordova-plugins/app-availability/ngx';


import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-redirect-instagram',
  templateUrl: './redirect-instagram.page.html',
  styleUrls: ['./redirect-instagram.page.scss'],
})
export class RedirectInstagramPage implements OnInit {
  constructor(
    private location: Location,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit() {}

  cancelButton() {
    this.location.back();
  }
  continueButton(appName) {
    // this should use instagram link also
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create(
        'https://www.instagram.com/' + appName
      );
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => {
        console.log(app + ' is available');
        // Success
        // App exists
        const browser: InAppBrowserObject = this.inAppBrowser.create(
          'instagram://user?username=' + appName,
          '_system'
        );
      },
      (no: boolean) => {
        // Error
        // App does not exist
        // Open Web URL
        const browser: InAppBrowserObject = this.inAppBrowser.create(
          'https://www.instagram.com/' + appName,
          '_system'
        );
      }
    );
  }
}
