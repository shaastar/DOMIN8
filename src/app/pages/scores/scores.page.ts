import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PopoverController, ModalController, Platform } from '@ionic/angular';
import { AddTeamNameComponent } from '../../components/add-team-name/add-team-name.component';

// import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  team1selected = false;
  team2selected = false;

  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router,
    private insomnia: Insomnia,
    //  private popover: PopoverController,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    // this.gameScore = [];
  }

  gameScore: Array<any> = []; //this is game score detail Array

  ngOnInit() {
    // this.gameScore = [];
  }

  backBtn() {
    this.router.navigate(['/tabs/point-select']);
  }

  ionViewWillEnter() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );

    console.log('PPPPP ' + this.selectedPointNumber);
    console.log('PPPPP ' + this.pointService.selectedPoint);

    if (
      this.selectedPointNumber < 1 ||
      this.selectedPointNumber == undefined ||
      this.pointService.selectedPoint == undefined
    ) {
      this.router.navigate(['/tabs/point-select']);
    }
    if (this.pointService.gameScore == null) {
      this.gameScore = [];
    }

    this.selectedPointNumber = this.pointService.selectedPoint;
    console.log('wwwww');
    console.log(this.temptotalscore1);
    console.log(this.temptotalscore2);
    console.log(this.selectedPointNumber);

    if (this.temptotalscore1 > 0 || this.temptotalscore2 > 0) {
      // this.pointService.team1Total = this.temptotalscore1;
      // this.pointService.team2Total = this.temptotalscore2;
      this.checkPointandTotal();
      console.log('FFFF');
    }

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

    console.log('line104');
    console.log('line123');
    // this.temproundscore1 = '';
    // this.temproundscore2 = '';
    // this.temptotalscore1 = 0;
    // this.temptotalscore2 = 0;
    // this.totalScore1 = 0;
    // this.totalScore2 = 0;
  }

  temptotalscore1: number = 0;
  temptotalscore2: number = 0;

  totalScore1: number = 0;
  totalScore2: number = 0;
  temproundscore1: string = '';
  temproundscore2: string = '';

  tempScoreChange(roundScore, team) {
    if (team == 'team1') {
      this.temproundscore1 = roundScore;
      this.temptotalscore1 = this.totalScore1 + roundScore;
    } else if (team == 'team2') {
      this.temproundscore2 = roundScore;
      this.temptotalscore2 = this.totalScore2 + roundScore;
    }
  }
  focusout() {
    if (
      this.temptotalscore1 >= this.selectedPointNumber ||
      this.temptotalscore2 >= this.selectedPointNumber
    ) {
      if (this.temproundscore1 != '' && this.temproundscore2 != '') {
        this.checkPointandTotal();
      }
    }
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

        // console.log('win1');
        this.resetValues();
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
        this.resetValues();
      }
    } else if (this.temptotalscore2 >= this.selectedPointNumber) {
      this.setDefaultTeamName();

      this.pointService.winTeamName1 = this.pointService.team2Name1;
      this.pointService.winTeamName2 = this.pointService.team2Name2;
      this.pointService.lossTeamName1 = this.pointService.team1Name1;
      this.pointService.lossTeamName2 = this.pointService.team1Name2;

      // console.log('win3');
      this.resetValues();
    }
  }

  resetValues() {
    //----this not resetting but assigning---
    this.pointService.team1Total = this.temptotalscore1;
    this.pointService.team2Total = this.temptotalscore2;

    // ---value resetting---
    this.pointService.handlecountTeamsWin();
    this.router.navigate(['/tabs/congrats']);
    this.gameScore = [];
    this.temproundscore1 = '';
    this.temproundscore2 = '';
    this.temptotalscore1 = 0;
    this.temptotalscore2 = 0;
    this.totalScore1 = 0;
    this.totalScore2 = 0;
  }

  addNewRound() {
    if (this.temproundscore1 >= '0' || this.temproundscore2 >= '0') {
      if (this.temproundscore1 == '') {
        this.temproundscore1 = '0';
      } else if (this.temproundscore2 == '') {
        this.temproundscore2 = '0';
      }
      this.totalScore1 = this.temptotalscore1;
      this.totalScore2 = this.temptotalscore2;
      var gameScoreObj = {
        totalscore1: 0,
        totalscore2: 0,
        roundscore1: '',
        roundscore2: '',
      };
      gameScoreObj.roundscore1 = this.temproundscore1;
      gameScoreObj.roundscore2 = this.temproundscore2;
      gameScoreObj.totalscore1 = this.temptotalscore1;
      gameScoreObj.totalscore2 = this.temptotalscore2;

      if (this.pointService.gameScore == null) {
        this.pointService.gameScore = [];
      }

      this.pointService.gameScore.push(gameScoreObj);
      this.temproundscore1 = '';
      this.temproundscore2 = '';

      this.gameScore = this.pointService.gameScore;
      console.log(this.team1);
      console.log(this.team2);
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
}
