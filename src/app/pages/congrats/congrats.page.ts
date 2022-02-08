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
    console.log("WINTEAM", this.pointService.winTeamName1 + ' + ' + this.pointService.winTeamName2);

    this.lang = localStorage.getItem('lang');
    this.winTeamName = `${this.pointService.winTeamName1} ${this.pointService.winTeamName2? ' + ' + this.pointService.winTeamName2 : ''}`
    
    this.score1 = this.pointService.team1Total;
    this.score2 = this.pointService.team2Total;
  }
}
