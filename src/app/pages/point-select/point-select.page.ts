import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController, IonInput, Platform } from '@ionic/angular';

import { TranslateConfigService } from '../../services/translate-config.service';
import { ModeHandlerService } from '../../services/mode-handler.service';

import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-point-select',
  templateUrl: './point-select.page.html',
  styleUrls: ['./point-select.page.scss'],
})
export class PointSelectPage implements OnInit {
  selectedLanguage: string = 'ENGLISH';
  customBtn: boolean = false;
  selectedPoint: string;
  selectedPointNumber: number;
  toggleChecked: boolean;
  @ViewChild('customInput') customInput: IonInput;
  isKeyboardShowing: boolean = false;
  constructor(
    private pointService: PointsHandlerService,
    private modeService: ModeHandlerService,
    private router: Router,
    private location: Location,
    private actionSheet: ActionSheetController,
    private translateConfigService: TranslateConfigService,
    private platform: Platform,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.modeService.observeModeChange().subscribe((toggleBtn) => {
      this.toggleChecked = toggleBtn;
      if (this.toggleChecked) {
        document.body.setAttribute('color-mode', 'dark');
      } else {
        document.body.setAttribute('color-mode', 'light');
      }
    });
    this.platform.ready().then(() => {
      Keyboard.addListener('keyboardWillShow', (info) => {
        this.zone.run(() => {
          this.isKeyboardShowing = true;
          console.log('Key board showing will show', this.isKeyboardShowing);
          this.changeDetectorRef.detectChanges();
        });
      });
      Keyboard.addListener('keyboardDidShow', (info) => {
        this.zone.run(() => {
          this.isKeyboardShowing = true;
          console.log('Key board showing will show', this.isKeyboardShowing);
          this.changeDetectorRef.detectChanges();
        });
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.zone.run(() => {
          this.isKeyboardShowing = false;
          console.log('Key board hiding will hide', this.isKeyboardShowing);
          this.changeDetectorRef.detectChanges();
        });
      });
    });
  }
  ionViewWillEnter() {
    this.customBtn = false;
    let lang = localStorage.getItem('lang');
    if (lang && lang == 'sp') {
      this.selectedLanguage = 'ESPAÑOL';
    }
  }

  backBtn() {
    this.router.navigate(['/tabs/language']);
  }
  selectLanguage(language: string) {
    this.translateConfigService.setLanguage(language);
  }
  openSelectLanguage() {
    this.actionSheet
      .create({
        cssClass: 'popup-class',
        mode: 'md',
        buttons: [
          {
            text: 'ENGLISH',
            icon: 'language-outline',
            cssClass: 'popup-item',
            handler: () => {
              this.selectedLanguage = 'ENGLISH';
              localStorage.setItem('lang', 'en');
              this.selectLanguage('en');
            },
          },
          {
            text: 'ESPAÑOL',
            icon: 'language-outline',
            cssClass: 'popup-item',
            handler: () => {
              this.selectedLanguage = 'ESPAÑOL';
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

  toggleCustomPoint() {
    this.customBtn = !this.customBtn;
    this.selectedPoint = '';
    this.selectedPointNumber = parseInt(this.selectedPoint);
  }
  addSelectedPoint(point: string) {
    this.selectedPoint = point;
    this.selectedPointNumber = parseInt(this.selectedPoint);
    this.setSelectedPoint();
  }
  addCustomPoint(inputPoint: string) {
    this.selectedPointNumber = parseInt(this.selectedPoint);
  }

  setSelectedPoint() {
    this.pointService.selectedPoint = this.selectedPointNumber;

    this.router.navigate(['tabs/scores']);
  }

  toggleTheme(event) {
    if (event.detail.checked) {
      this.modeService.toggleMode(true);
      localStorage.setItem('mode', 'true');
    } else {
      this.modeService.toggleMode(false);
      localStorage.setItem('mode', 'false');
    }
  }
}
