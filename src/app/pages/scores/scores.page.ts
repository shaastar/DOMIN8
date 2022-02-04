import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {
  lang: string = localStorage.getItem('lang');
  selectedPointNumber: number = this.pointService.selectedPoint;
  team1Name: string = '';
  team2Name: string = '';
  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router, 
     private insomnia: Insomnia
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
    if (this.team1Name == '' && this.team2Name == '') {
      if (this.lang == 'en') {
        this.team1Name = 'TEAM I';
        this.team2Name = 'TEAM II';
      } else if (this.lang == 'sp') {
        this.team1Name = 'EQUIPO I';
        this.team2Name = 'EQUIPO II';
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
        this.pointService.winTeamName = this.team2Name;
        this.pointService.lossTeamName = this.team1Name;

        // console.log('win1');
        this.resetValues();
      }
      // }
      else if (this.temptotalscore2 != this.temptotalscore1) {
        // ---this is team1(leftside) winning---
        // ---could be both are greater than selected points---
        this.pointService.winTeamName = this.team1Name;
        this.pointService.lossTeamName = this.team2Name;

        // console.log('win2');
        this.resetValues();
      }
    } else if (this.temptotalscore2 >= this.selectedPointNumber) {
      // this is team2(rightside) winning
      // and only selected point pass by team2
      this.pointService.winTeamName = this.team2Name;
      this.pointService.lossTeamName = this.team1Name;

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
    console.log(this.team1Name);
    console.log(this.team2Name);
  }
}
