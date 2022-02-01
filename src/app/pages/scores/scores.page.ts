import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})
export class ScoresPage implements OnInit {
  team1: string = 'TEAM I';
  team2: string = 'TEAM II';
  constructor() {}

  ngOnInit() {}
}
