import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { TranslateConfigService } from '../../services/translate-config.service';
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  selectedLanguage: string = "ENGLISH";
  constructor(
    private actionSheet: ActionSheetController,
    private translateConfigService: TranslateConfigService
  ) {
    // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  selectLanguage(language: string) {
    this.translateConfigService.setLanguage(language);
  }

  ngOnInit() {}

  openSelectLanguage() {
    this.actionSheet
      .create({
        // header: 'Albums',
        cssClass: 'my-custom-class',
        mode: 'md',
        buttons: [
          {
            text: 'English',
            icon: 'share',
            handler: () => {
              console.log('English Selected');
              this.selectedLanguage = "ENGLISH"
              this.selectLanguage('en');
            },
          },
          {
            text: 'Spanish',
            icon: 'caret-forward-circle',
            handler: () => {
              console.log('Spanish Selected');
              this.selectedLanguage = "SPANISH"
              this.selectLanguage('sp');
            },
          },
          // {
          //   text: 'Favorite',
          //   icon: 'heart',
          //   handler: () => {
          //     console.log('Favorite clicked');
          //   },
          // },
          // {
          //   text: 'Cancel',
          //   icon: 'close',
          //   role: 'cancel',
          //   handler: () => {
          //     console.log('Cancel clicked');
          //   }
          // }
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
