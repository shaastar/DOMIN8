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

  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router,
    private insomnia: Insomnia,
    //  private popover: PopoverController,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    this.gameScore = [];
  }

  gameScore; //this is game score detail Array

  ngOnInit() {
    this.gameScore = [];
  }

  backBtn() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );

    this.selectedPointNumber = this.pointService.selectedPoint;

    this.lang = localStorage.getItem('lang');
    if (this.team1 == '' && this.team2 == '') {
      if (this.lang == 'sp') {
        this.team1 = 'EQUIPO I';
        this.pointService.team1Name1 = 'EQUIPO I';
        this.pointService.team1Name2 = null;
        this.team2 = 'EQUIPO II';
        this.pointService.team2Name1 = 'EQUIPO II';
        this.pointService.team2Name2 = null;
      } else {
        this.team1 = 'TEAM I';
        this.pointService.team1Name1 = 'TEAM I';
        this.pointService.team1Name2 = null;
        this.team2 = 'TEAM II';
        this.pointService.team2Name1 = 'TEAM II';
        this.pointService.team2Name2 = null;
      }
    }

    // handle game score
    if (localStorage.getItem('gamescore') == null) {
      this.gameScore = [];
    }
  }
  ionViewDidLeave() {
    this.insomnia.allowSleepAgain().then(
      () => console.log('success'),
      () => console.log('error')
    );
    // localStorage.setItem('gamescore', JSON.stringify(this.gameScore));
    // this.gameScore = [];
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
        this.pointService.winTeamName1 = this.pointService.team1Name1;
        this.pointService.winTeamName2 = this.pointService.team1Name2;
        this.pointService.lossTeamName1 = this.pointService.team2Name1;
        this.pointService.lossTeamName2 = this.pointService.team2Name2;
        this.resetValues();
      }
    } else if (this.temptotalscore2 >= this.selectedPointNumber) {
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
      if (this.pointService.team1Name1) {
        this.team1 = `${this.pointService.team1Name1} ${
          this.pointService.team1Name2
            ? ' + ' + this.pointService.team1Name2
            : ''
        }`;
      }
      if (this.pointService.team2Name1) {
        this.team2 = `${this.pointService.team2Name1} ${
          this.pointService.team2Name2
            ? ' + ' + this.pointService.team2Name2
            : ''
        }`;
      }
      console.log('ffffffffff' + this.pointService.team1Name1);
      console.log('ffffffffff' + this.pointService.team1Name2);
      console.log('ffffffffff' + this.pointService.team2Name1);
      console.log('ffffffffff' + this.pointService.team2Name2);
    });
    return await modal.present();
  }
}
