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

  ionViewWillEnter(){
  let lang = localStorage.getItem('lang');
  if(lang && lang == 'sp'){
    this.selectedLanguage = "ESPAÑOL";
  }
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
            icon: 'language-outline',
            handler: () => {
              console.log('English Selected');
              this.selectedLanguage = "ENGLISH";
              localStorage.setItem('lang', 'en');
              this.selectLanguage('en');
            },
          },
          {
            text: 'Spanish',
            icon: 'language-outline',
            handler: () => {
              console.log('Spanish Selected');
              this.selectedLanguage = "ESPAÑOL"
              localStorage.setItem('lang', 'sp');
              this.selectLanguage('sp');
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
