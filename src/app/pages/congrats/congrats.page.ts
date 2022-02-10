import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {
  lang: string = localStorage.getItem('lang');
  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router
  ) {}
  winTeamName;
  score1 = this.pointService.team1Total;
  score2 = this.pointService.team2Total;

  ngOnInit() {}

  backBtn() {
    // this.location.back();
    this.router.navigate(['/tabs/point-select']);
  }

  ionViewWillEnter() {
    this.resetGameScore();

    // console.log(
    //   'WINTEAM',
    //   this.pointService.winTeamName1 + ' + ' + this.pointService.winTeamName2
    // );

    this.lang = localStorage.getItem('lang');
    this.winTeamName = `${this.pointService.winTeamName1} ${
      this.pointService.winTeamName2
        ? ' + ' + this.pointService.winTeamName2
        : ''
    }`;

    this.score1 = this.pointService.team1Total;
    this.score2 = this.pointService.team2Total;
  }
  ionViewDidLeave() {
    this.resetValues();
  }

  resetValues() {
    // this.pointService.gameScore = null;
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
  }

  resetGameScore() {
    this.pointService.gameScore = null;
  }
}
