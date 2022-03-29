import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
declare var anime: any; // declare like this
@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {
  lang: string = localStorage.getItem('lang');
  popupSpanish = 'Comenzarás un juego de revancha. ¿Deseas proceder?';
  popupEnglish = 'You will begin a rematch game. Do you wish to proceed?';
  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private alertController : AlertController
  ) {}
  winTeamName;
  score1 = this.pointService.team1Total;
  score2 = this.pointService.team2Total;

  ngOnInit() {}

  backBtn() {
    // this.location.back();
    this.router.navigate(['/tabs/scores']);
  }

  ngAfterViewInit(): void {}
  async ionViewWillEnter() {
    console.log("View entering?");
    
    this.ngOnInit();
    this.resetGameScore();

    this.lang = localStorage.getItem('lang');
    this.winTeamName = `${this.pointService.winTeamName1} ${
      this.pointService.winTeamName2
        ? ' + ' + this.pointService.winTeamName2
        : ''
    }`;

    this.score1 = this.pointService.team1Total;
    this.score2 = this.pointService.team2Total;

    if (!this.winTeamName) {
      this.router.navigate(['/tabs/point-select']);
    }
    this.changeDetector.detectChanges();
    anime.timeline().add({
      targets: '.c2 .word',
      scale: [14, 1],
      opacity: [0, 1],
      easing: 'easeOutCirc',
      duration: 250,
      delay: (el, i) => 300 * i,
    });

    await delay(500);
    Keyboard.hide().then((res) => {
      console.log('KEYBOARD IS HIDING MAN');
    });
    await delay(500);
    Keyboard.hide().then((res) => {
      console.log('KEYBOARD IS HIDING MAN');
    });
  }
  ionViewDidLeave() {
    this.winTeamName = '';
    this.score1 = 0;
    this.score2 = 0;
  }

  resetPointServiceValues() {
    this.pointService.winTeamName1 = '';
    this.pointService.winTeamName2 = '';
    this.pointService.lossTeamName1 = '';
    this.pointService.lossTeamName2 = '';
    this.pointService.team1Name1 = '';
    this.pointService.team1Name2 = '';
    this.pointService.team2Name1 = '';
    this.pointService.team2Name2 = '';
    this.pointService.team1Total = 0;
    this.pointService.team2Total = 0;
    this.pointService.selectedPoint = 0;
  }

  resetGameScore() {
    this.pointService.isNewGame = false;
  }

  playAnimation() {
  //   anime.timeline()
  // .add({
  //   targets: '.c2',
  //   opacity: 0,
  //   duration: 1000,
  //   easing: "easeOutCirc",
  //   delay: 0
  // });


  }


  async cancelCurrentGame() {
    let lang = localStorage.getItem('lang');
    const alert = await this.alertController.create({
      header: lang == 'sp' ? 'NUEVO JUEGO' : 'NEW GAME',
      message:
        lang == 'sp'
          ? 'Comenzarás un nuevo juego. ¿Deseas proceder?'
          : 'You will begin a new game. Do you wish to proceed?',
      buttons: [
        {
          text: lang == 'sp' ? 'CONTINUAR' : 'CONTINUE',
          cssClass: 'continue-btn',
          handler: async () => {
            this.pointService.gameScore = null;
            this.pointService.gameScore = [];
            this.pointService.isNewGame = true;
            this.pointService.isGameEnd = false;
            this.pointService.winTeamName1 = '';
            this.pointService.winTeamName2 = '';
            this.pointService.lossTeamName1 = '';
            this.pointService.lossTeamName2 = '';
            this.pointService.team1Name1 = '';
            this.pointService.team1Name2 = '';
            this.pointService.team2Name1 = '';
            this.pointService.team2Name2 = '';
            this.pointService.team1Total = 0;
            this.pointService.team2Total = 0;
            this.pointService.selectedPoint = 0;
            this.router.navigate(['/tabs/point-select']);
          },
        },
        {
          text: lang == 'sp' ? 'CANCELAR' : 'CANCEL',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {},
        },
      ],
      cssClass: 'alert-all',
    });
    await alert.present();
  }

  async rematch(){
    let lang = localStorage.getItem('lang');
    const alert = await this.alertController.create({
      header: lang == 'sp' ? 'REVANCHA' : 'REMATCH',
      message:
        lang == 'sp'
          ? this.popupSpanish
          : this.popupEnglish,
      buttons: [
        {
          text: lang == 'sp' ? 'CONTINUAR' : 'CONTINUE',
          cssClass: 'continue-btn',
          handler: async () => {
            this.pointService.gameScore = null;
            this.pointService.gameScore = [];
            this.pointService.isNewGame = true;
            this.pointService.isGameEnd = false;
            this.pointService.winTeamName1 = '';
            this.pointService.winTeamName2 = '';
            this.pointService.lossTeamName1 = '';
            this.pointService.lossTeamName2 = '';
            this.pointService.team1Total = 0;
            this.pointService.team2Total = 0;
            this.pointService.selectedPoint = 0;
            this.router.navigate(['/tabs/point-select']);
          },
        },
        {
          text: lang == 'sp' ? 'CANCELAR' : 'CANCEL',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {},
        },
      ],
      cssClass: 'alert-all',
    });
    await alert.present();
  }
}
