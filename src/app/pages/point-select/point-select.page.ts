import { Component, OnInit, ViewChild } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController, IonInput } from '@ionic/angular';

import { TranslateConfigService } from '../../services/translate-config.service';

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
  @ViewChild('customInput') customInput: IonInput;
  constructor(
    private pointService: PointsHandlerService,
    private router: Router,
    private location: Location,
    private actionSheet: ActionSheetController,
    private translateConfigService: TranslateConfigService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.customBtn = false;
    let lang = localStorage.getItem('lang');
    if (lang && lang == 'sp') {
      this.selectedLanguage = 'ESPAÑOL';
    }
    // localStorage.setItem('gamescore', null);
    // this.pointService.gameScore = [];
    // this.pointService.winTeamName1 = '';
    // this.pointService.winTeamName2 = '';
    // this.pointService.lossTeamName1 = '';
    // this.pointService.lossTeamName2 = '';
    // this.pointService.team1Total = 0;
    // this.pointService.team2Total = 0;
  }

  backBtn() {
    // this.location.back();
    this.router.navigate(['/tabs/language']);
  }
  selectLanguage(language: string) {
    this.translateConfigService.setLanguage(language);
  }
  openSelectLanguage() {
    this.actionSheet
      .create({
        // header: 'Albums',
        cssClass: 'my-custom-class',
        mode: 'md',
        buttons: [
          {
            text: 'ENGLISH',
            icon: 'language-outline',
            handler: () => {
              console.log('English Selected');
              this.selectedLanguage = 'ENGLISH';
              localStorage.setItem('lang', 'en');
              this.selectLanguage('en');
            },
          },
          {
            text: 'ESPAÑOL',
            icon: 'language-outline',
            handler: () => {
              console.log('Spanish Selected');
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
    this.selectedPointNumber = Number(this.selectedPoint);
    // if(this.customBtn){
    //   console.log("Here");
    //   this.customInput.setFocus();
    // }
  }
  addSelectedPoint(point: string) {
    this.selectedPoint = point;
    this.selectedPointNumber = Number(this.selectedPoint);
    this.setSelectedPoint();
  }
  addCustomPoint(inputPoint: string) {
    this.selectedPointNumber = Number(this.selectedPoint);
  }

  setSelectedPoint() {
    console.log(this.selectedPointNumber);
    this.pointService.selectedPoint = this.selectedPointNumber;

    this.router.navigate(['tabs/scores']);
  }

  customPointOk() {}
}
