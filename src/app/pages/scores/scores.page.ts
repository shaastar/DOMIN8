import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {
  selectedPointNumber: number = this.pointService.selectedPoint;
  team1: string = 'TEAM I';
  team2: string = 'TEAM II';
  constructor
  (
    private pointService: PointsHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  addNewRound(){
    console.log(this.team1)
    console.log(this.team2)
  }
}
