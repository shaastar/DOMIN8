import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
    this.router.navigate(['/tabs/scores']);
  }

  async ionViewWillEnter() {
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
}
