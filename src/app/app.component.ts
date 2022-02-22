import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { TranslateConfigService } from './services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { ModeHandlerService } from './services/mode-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private platform: Platform,
    private modeService: ModeHandlerService,
  ) {
    this.initializeApp();
    if(localStorage.getItem('mode')){
      this.modeService.toggleMode(JSON.parse(localStorage.getItem('mode')));
    }
    else{
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide({
          fadeOutDuration: 500,
        });
      }, 600);
    });

    if (localStorage.getItem('lang')) {
      // this.translate.setDefaultLang(localStorage.getItem('lang'));
      // this.translate.use(localStorage.getItem('lang'));
      this.translateConfig.setLanguage(localStorage.getItem('lang'));
    } else {
      this.translateConfig.setLanguage('en');
      localStorage.setItem('lang', 'en');
      // this.translateConfig.getDefaultLanguage();

      // this.translate.setDefaultLang('en');
      // this.translate.use('en');
    }
  }
}
