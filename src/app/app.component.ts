import { Component } from '@angular/core';
import { TranslateConfigService } from './services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private translateConfig: TranslateConfigService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (localStorage.getItem('lang')) {
      // this.translate.setDefaultLang(localStorage.getItem('lang'));
      // this.translate.use(localStorage.getItem('lang'));
      this.translateConfig.setLanguage(localStorage.getItem('lang'));
    } else {
      this.translateConfig.setLanguage('en');
      // this.translateConfig.getDefaultLanguage();

      // this.translate.setDefaultLang('en');
      // this.translate.use('en');
    }
  }
}
