import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-current-game',
  templateUrl: './cancel-current-game.page.html',
  styleUrls: ['./cancel-current-game.page.scss'],
})
export class CancelCurrentGamePage implements OnInit {
  lang: string = localStorage.getItem('lang');
  constructor(
    private Translate: TranslateService,
    private location: Location,
    private pointService: PointsHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.lang = localStorage.getItem('lang');
  }
  backBtn() {
    this.location.back();
  }

  startNewGame() {
    // localStorage.setItem('gamescore', null);
    this.pointService.gameScore = null;
    this.pointService.gameScore = [];
    this.pointService.isNewGame = true;
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
    
  }
}
