import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  PopoverController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { AddTeamNameComponent } from '../../components/add-team-name/add-team-name.component';

import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {
  lang: string = localStorage.getItem('lang');
  selectedPointNumber: number = this.pointService.selectedPoint;
  team1: string = '';
  team2: string = '';
  team1selected: boolean = false;
  team2selected: boolean = false;
  isNewround: boolean;
  isKeyboardShowing: boolean = false;
  currentPlatform: any;
  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router,
    private insomnia: Insomnia,
    //  private popover: PopoverController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private alertController: AlertController
  ) {
    // this.gameScore = [];
  }

  gameScore: Array<any> = [{}]; //this is game score detail Array

  async ngOnInit() {
    this.currentPlatform = await Capacitor.getPlatform();
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

  backBtn() {
    this.router.navigate(['/tabs/point-select']);
  }

  ionViewWillEnter() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );

    this.selectedPointNumber = this.pointService.selectedPoint;

    if (
      this.selectedPointNumber > this.temptotalscore1 &&
      this.selectedPointNumber > this.temptotalscore2
    ) {
      this.isNewround = true;
    } else if (!this.pointService.isGameEnd && !this.pointService.isNewGame) {
      this.checkPointandTotal();
    }

    if (this.pointService.isNewGame == true) {
      this.gameScore = [{}];
      this.selectedPointNumber = 0;
      this.selectedPointNumber = this.pointService.selectedPoint;
      this.temproundscore1 = '';
      this.temproundscore2 = '';
      this.temptotalscore1 = 0;
      this.temptotalscore2 = 0;
      this.totalScore1 = 0;
      this.totalScore2 = 0;
      this.pointService.isNewGame = false;
      this.isNewround = true;
    }

    this.selectedPointNumber = this.pointService.selectedPoint;

    if (!this.pointService.team1Name1 || !this.pointService.team1Name2) {
      this.team1selected = false;
    }
    if (!this.pointService.team2Name1 || !this.pointService.team2Name2) {
      this.team2selected = false;
    }

    this.lang = localStorage.getItem('lang');
    if (this.lang == 'sp') {
      if (!this.team1selected) {
        this.team1 = 'EQUIPO I';
      }
      if (!this.team2selected) {
        this.team2 = 'EQUIPO II';
      }
    } else {
      if (!this.team1selected) {
        this.team1 = 'TEAM I';
      }
      if (!this.team2selected) {
        this.team2 = 'TEAM II';
      }
    }
  }
  ionViewDidLeave() {
    this.insomnia.allowSleepAgain().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  temptotalscore1: number = 0;
  temptotalscore2: number = 0;

  totalScore1: number = 0;
  totalScore2: number = 0;
  temproundscore1: string = '';
  temproundscore2: string = '';

  tempScoreChange() {
    let team1Score = 0;
    let team2Score = 0;
    this.gameScore.forEach((score) => {
      if (score.roundscore1) {
        team1Score += parseInt(score.roundscore1);
      }
      if (score.roundscore2) {
        team2Score += parseInt(score.roundscore2);
      }
    });
    console.log(team1Score, team2Score);

    this.temptotalscore1 = team1Score;
    this.temptotalscore2 = team2Score;
  }
  async focusout(e, i) {
    e.preventDefault();
    await delay(300);
    if (this.gameScore.length - i == 1) return;
    this.checkPointandTotal();
  }

  checkPointandTotal() {
    if (this.temptotalscore1 >= this.selectedPointNumber) {
      // if(this.temptotalscore2>=this.selectedPointNumber){
      if (this.temptotalscore2 > this.temptotalscore1) {
        // ---this is team2(rightside) winning---
        // ---but both are greater than selected points---
        this.setDefaultTeamName();

        this.pointService.winTeamName1 = this.pointService.team2Name1;
        this.pointService.winTeamName2 = this.pointService.team2Name2;
        this.pointService.lossTeamName1 = this.pointService.team1Name1;
        this.pointService.lossTeamName2 = this.pointService.team1Name2;

        this.assignTotalToService();
      }
      // }
      else if (this.temptotalscore2 != this.temptotalscore1) {
        // ---this is team1(leftside) winning---
        // ---could be both are greater than selected points---
        this.setDefaultTeamName();

        this.pointService.winTeamName1 = this.pointService.team1Name1;
        this.pointService.winTeamName2 = this.pointService.team1Name2;
        this.pointService.lossTeamName1 = this.pointService.team2Name1;
        this.pointService.lossTeamName2 = this.pointService.team2Name2;

        this.assignTotalToService();
      }
    } else if (this.temptotalscore2 >= this.selectedPointNumber) {
      this.setDefaultTeamName();

      this.pointService.winTeamName1 = this.pointService.team2Name1;
      this.pointService.winTeamName2 = this.pointService.team2Name2;
      this.pointService.lossTeamName1 = this.pointService.team1Name1;
      this.pointService.lossTeamName2 = this.pointService.team1Name2;

      this.assignTotalToService();
    }
  }

  assignTotalToService() {
    this.isNewround = false;
    this.pointService.team1Total = this.temptotalscore1;
    this.pointService.team2Total = this.temptotalscore2;
    if (!this.pointService.isGameEnd) {
      this.pointService.handlecountTeamsWin();
      this.pointService.isGameEnd = true;
    }
    Keyboard.hide().then((res) => {
      console.log('Hiding keyboard ah');
    });
    this.router.navigate(['/tabs/congrats']);
    if (
      !this.gameScore[this.gameScore.length - 1].roundscore1 &&
      !this.gameScore[this.gameScore.length - 1].roundscore2
    ) {
      this.gameScore.pop();
    }
  }
  resetValues() {
    // ---value resetting---
    this.gameScore = [];
    this.temproundscore1 = '';
    this.temproundscore2 = '';
    this.temptotalscore1 = 0;
    this.temptotalscore2 = 0;
    this.totalScore1 = 0;
    this.totalScore2 = 0;
  }

  addNewRound() {
    console.log(this.gameScore);
  
    if (
      this.gameScore[this.gameScore.length - 1].roundscore1 > '0' ||
      this.gameScore[this.gameScore.length - 1].roundscore2 > '0'
    ) {
      this.gameScore.push({});
    }
    this.checkPointandTotal();
  }

  async presentModal(teamside) {
    const modal = await this.modalCtrl.create({
      component: AddTeamNameComponent,
      cssClass: 'class-player-model',
      componentProps: {
        teamSide: teamside,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.handleTeamName();
    });
    return await modal.present();
  }

  handleTeamName() {
    if (this.pointService.team1Name1) {
      this.team1 = `${this.pointService.team1Name1} ${
        this.pointService.team1Name2 ? ' + ' + this.pointService.team1Name2 : ''
      }`;
      this.team1selected = true;
    } else if (this.pointService.team1Name2) {
      this.team1 = `${this.pointService.team1Name2}`;
      this.team1selected = true;
    }
    if (this.pointService.team2Name1) {
      this.team2 = `${this.pointService.team2Name1} ${
        this.pointService.team2Name2 ? ' + ' + this.pointService.team2Name2 : ''
      }`;
      this.team2selected = true;
    } else if (this.pointService.team2Name2) {
      this.team2 = `${this.pointService.team2Name2}`;
      this.team2selected = true;
    }
  }
  setDefaultTeamName() {
    if (this.team1selected == false) {
      this.pointService.team1Name1 = this.team1;
      this.pointService.team1Name2 = '';
      console.log('iiiii ' + this.team1);
    }
    if (this.team2selected == false) {
      this.pointService.team2Name1 = this.team2;
      this.pointService.team2Name2 = '';
      console.log('pppppp ' + this.team2);
    }
  }

  async cancelCurrentGame() {
    let lang = localStorage.getItem('lang');
    const alert = await this.alertController.create({
      header: lang == 'sp' ? 'NUEVO JUEGO' : 'NEW GAME',
      message:
        lang == 'sp'
          ? 'Comenzar??s un nuevo juego. ??Deseas proceder?'
          : 'You will begin a new game. Do you wish to proceed?',
      buttons: [
        {
          text: lang == 'sp' ? 'CONTINUAR' : 'CONTINUE',
          cssClass: 'continue-btn',
          handler: () => {
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
            this.selectedPointNumber = 0;
            this.temptotalscore1 = 0;
            this.temptotalscore2 = 0;
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
