import { Platform } from '@ionic/angular';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PointsHandlerService } from '../services/points-handler.service';

// import { TranslateService } from '@ngx-translate/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isKeyboardShowing: boolean = false;
  className1: string;
  id1: string;
  id2: string;
  id3: string;
  id4: string;
  id5: string;
  id6: string;
  id7: string;
  id8: string;
  id9: string;

  playClicked = false;
  exploreClicked = false;
  constructor(
    private router: Router,
    private pointService: PointsHandlerService,
    private platform: Platform,
    private changeDetectorRef : ChangeDetectorRef
  ) {
    this.platform.ready().then(() => {
      Keyboard.addListener('keyboardWillShow', (info) => {
        this.isKeyboardShowing = true;
        console.log("Key board showing will show", this.isKeyboardShowing);
        this.changeDetectorRef.detectChanges();

      });
      Keyboard.addListener('keyboardDidShow', (info) => {
        this.isKeyboardShowing = true;
        console.log("Key board showing did show", this.isKeyboardShowing);
        this.changeDetectorRef.detectChanges();
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.isKeyboardShowing = false;
        console.log("Key board hiding will hide", this.isKeyboardShowing);
        this.changeDetectorRef.detectChanges();
      });
 
    });
  }

  play() {
    // this.router.navigate(['/section'], { queryParams: { id: number } });
    if (this.playClicked == false) {
      this.playClicked = true;
      setTimeout(() => {
        this.playClicked = false;
      }, 5570);
    }
  }

  explore() {
    // this.router.navigate(['/tabs/redirect-instagram']);
    if (this.exploreClicked == false) {
      this.exploreClicked = true;
      setTimeout(() => {
        this.className1 = 'txt-start';
        this.id1 = 'txt1';
        this.id2 = 'txt2';
        this.id3 = 'txt3';
        this.id4 = 'txt4';
        this.id5 = 'txt5';
        this.id6 = 'txt6';
        this.id7 = 'txt7';
        this.id8 = 'txt8';
        this.id9 = 'txt9';
      }, 10);
      setTimeout(() => {
        this.className1 = 'txt-hide';
        this.id1 = 'txt-hide1';
        this.id2 = 'txt-hide2';
        this.id3 = 'txt-hide3';
        this.id4 = 'txt-hide4';
        this.id5 = 'txt-hide5';
        this.id6 = 'txt-hide6';
        this.id7 = 'txt-hide7';
        this.id8 = 'txt-hide8';
        this.id9 = 'txt-hide9';
      }, 2500);

      setTimeout(() => {
        this.exploreClicked = false;
      }, 4650);
    }
  }

  clickDomino() {
    if (this.pointService.isNewGame == false) {
      this.router.navigate(['/tabs/scores']);
    } else {
      this.router.navigate(['/tabs/point-select']);
    }
    // console.log(this.router.url);
  }
}
