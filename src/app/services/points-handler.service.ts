import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PointsHandlerService {
  selectedPoint: number;

  // gameScore = [];
  gameScore: Array<any> = [];

  // team1Name: string;
  // team2Name: string;
  winTeamName: string;
  lossTeamName: string;
  team1Total: number;
  team2Total: number;

  constructor() {
    if (localStorage.getItem('gamescore') == null) {
      this.gameScore = [];
    }
  }

  handlecountTeamsWin() {
    console.log(this.winTeamName + '  jjkkjj jj');
    if (this.winTeamName != null) {
      this.countTeamsWin();
      console.log('reach handle');
      // this.gameScore = [];
    }
  }
  countTeamsWin() {
    var teams: Array<any> = [];
    var winTeam = { teamname: this.winTeamName, wins: 1, loss: 0 };
    var lossTeam = { teamname: this.lossTeamName, wins: 0, loss: 1 };
    var winTeamAdded = false;
    var lossTeamAdded = false;
    if (localStorage.getItem('teams') == null) {
      teams.push(winTeam);
      teams.push(lossTeam);
      // localStorage.setItem('teams', JSON.stringify(teams));
    } else {
      teams = JSON.parse(localStorage.getItem('teams'));
      var i = 0;
      for (var team of teams) {
        i++;
        if (team.teamname == winTeam.teamname) {
          team.wins = team.wins + 1;
          winTeamAdded = true;
        } else if (team.teamname == lossTeam.teamname) {
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
        // else if (team.teamname != lossTeam.teamname) {
        //   teams.push(lossTeam);
        //   localStorage.setItem('teams', JSON.stringify(teams));

        // } else if (team.teamname != winTeam.teamname) {
        //   teams.push(winTeam);
        //   localStorage.setItem('teams', JSON.stringify(teams));
        // }
      }
    }
    localStorage.setItem('teams', JSON.stringify(teams));
  }
}
