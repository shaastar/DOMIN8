import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  constructor(private location: Location) {}

  teams = JSON.parse(localStorage.getItem('teams'));

  ngOnInit() {}

  backBtn() {
    this.location.back();
  }

  ionViewWillEnter() {
    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.teams.forEach((team) => {
      team.winPercentage = (team.wins / (team.wins + team.loss)).toFixed(2);
    });
    this.teams.sort(function(team1, team2) {
      return parseFloat(team2.winPercentage) - parseFloat(team1.winPercentage) || team2.wins - team1.wins;
  });
  }
}
