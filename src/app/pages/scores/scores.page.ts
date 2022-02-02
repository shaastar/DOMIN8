import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';

// import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

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
    private pointService: PointsHandlerService,
    private router: Router // private insomnia: Insomnia
  ) {}

  gameScore; //this is game score detail Array

  ngOnInit() {
    this.gameScore = [];
  }

  ionViewWillEnter() {
    // this.insomnia.keepAwake().then(
    //   () => console.log('success'),
    //   () => console.log('error')
    // );
    if (this.lang == 'en') {
      this.team1Name = 'TEAM I';
      this.team2Name = 'TEAM II';
    } else if (this.lang == 'sp') {
      this.team1Name = 'EQUIPO I';
      this.team2Name = 'EQUIPO II';
    }
  }
  ionViewDidLeave() {
    // this.insomnia.allowSleepAgain().then(
    //   () => console.log('success'),
    //   () => console.log('error')
    // );
  }

  temptotalscore1: number = 0;
  temptotalscore2: number = 0;
  temproundscore1: string = "";
  temproundscore2: string = "";

  // gameScore: Array<any>=[];
  gameScoreObj = {
    totalscore1: 0,
    totalscore2: 0,
    roundscore1: "",
    roundscore2: "",
  };

  tempScoreChange(roundScore, team) {
    if (team == 'team1') {
      this.temproundscore1 = roundScore;
      this.temptotalscore1 = this.gameScoreObj.totalscore1 + roundScore;
    } else if (team == 'team2') {
      this.temproundscore2 = roundScore;
      this.temptotalscore2 = this.gameScoreObj.totalscore2 + roundScore;
    }
  }
  addNewRound() {
    this.gameScoreObj.roundscore1 = this.temproundscore1;
    this.gameScoreObj.roundscore2 = this.temproundscore2;
    this.gameScoreObj.totalscore1 = this.temptotalscore1;
    this.gameScoreObj.totalscore2 = this.temptotalscore2;

    // this.pointService.gameScore.push(this.gameScoreObj);
    this.pointService.gameScore.length;
    this.temproundscore1 ="";
    this.temproundscore2 ="";

    this.gameScore = this.pointService.gameScore;
    console.log(this.team1Name);
    console.log(this.team2Name);
  }
}
