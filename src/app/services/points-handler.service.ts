import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsHandlerService {
  
  selectedPoint: number;

  // gameScore = [];
  gameScore: Array<any> = []; //this is game score detail Array
  isNewGame = true; //this get true when current game finish or cancelled
  isGameEnd = false

  team1Name1: string = '';
  team1Name2: string = '';
  team2Name1: string = '';
  team2Name2: string = '';

  winTeamName1: string;
  winTeamName2: string;
  lossTeamName1: string;
  lossTeamName2: string;

  team1Total: number;
  team2Total: number;

  constructor() {
    // if (localStorage.getItem('gamescore') == null) {
    //   this.gameScore = [];
    // }
  }

  handlecountTeamsWin() {
    console.log(this.winTeamName1 + '  jjkkjj jj');
    if (this.winTeamName1 != null) {
      this.countTeamsWin();
      console.log('reach handle');
    }
  }
  countTeamsWin() {
    try {
      var teams: Array<any> = [];
    var winTeam = {
      teamname1: this.winTeamName1,
      teamname2: this.winTeamName2,
      wins: 1,
      loss: 0,
    };
    var lossTeam = {
      teamname1: this.lossTeamName1,
      teamname2: this.lossTeamName2,
      wins: 0,
      loss: 1,
    };
    var winTeamAdded = false;
    var lossTeamAdded = false;
    if (localStorage.getItem('teams') == null || JSON.parse(localStorage.getItem('teams')).length == 0) {
      console.log("if 1");
      
      teams.push(winTeam);
      teams.push(lossTeam);
    } else {
      
      teams = JSON.parse(localStorage.getItem('teams'));
      console.log("Elkse 1", teams);
      var i = 0;
      for (var team of teams) {
        console.log("for", team);
        
        i++;
        if (
          team.teamname1 == winTeam.teamname1 &&
          team.teamname2 == winTeam.teamname2
        ) {
          team.wins = team.wins + 1;
          winTeamAdded = true;
        } else if (
          team.teamname1 == lossTeam.teamname1 &&
          team.teamname2 == lossTeam.teamname2
        ) {
          team.loss = team.loss + 1;
          lossTeamAdded = true;
        }
        if (i >= teams.length) {
          if (!winTeamAdded) {
            teams.push(winTeam);
          }
          if (!lossTeamAdded) {
            teams.push(lossTeam);
          }
          break;
        }
      }
    }
    localStorage.setItem('teams', JSON.stringify(teams));
    console.log("Team saved", teams);
    
    } catch (error) {
      console.log("Catch error",error);
      
    }
  }
}
