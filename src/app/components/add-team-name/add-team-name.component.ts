import { Component, OnInit, Input } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-team-name',
  templateUrl: './add-team-name.component.html',
  styleUrls: ['./add-team-name.component.scss'],
})
export class AddTeamNameComponent implements OnInit {
  @Input() teamSide: string;
  tempplayer1;
  tempplayer2;
  teams = [];
  teamsUnfiltered = [];

  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private modalController: ModalController
  ) {}

  backBtn() {
    this.location.back();
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  teamClicked(team) {
    this.tempplayer1 = team.teamname1;
    this.tempplayer2 = team.teamname2;
  }

  ngOnInit() {
    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.teamsUnfiltered = this.teams;
    // console.log(this.teams);
  }

  addTeam() {
    console.log('nnnnnnn ' + this.teamSide);
    if (this.teamSide == 'team I') {
      console.log('team1');
      this.pointService.team1Name1 = this.tempplayer1;
      this.pointService.team1Name2 = this.tempplayer2;
    }
    console.log('gggggggggg')
    if (this.teamSide == 'team II') {
      console.log('team2');
      this.pointService.team2Name1 = this.tempplayer1;
      this.pointService.team2Name2 = this.tempplayer2;
    }

    this.modalController.dismiss({
      dismissed: true,
    });
  }

  team1Changed() {
    this.resetChanges();
    if (this.tempplayer1) {
      console.log('Here');

      this.teams = this.teams.filter((team) => {
        if (team.teamname1) {
          return (
            team.teamname1
              .toLowerCase()
              .indexOf(this.tempplayer1.toLowerCase()) > -1
          );
        }
      });
    }
  }

  team2Changed() {
    this.resetChanges();
    if (this.tempplayer2) {
      this.teams = this.teams.filter((team) => {
        if (team.teamname2) {
          return (
            team.teamname2
              .toLowerCase()
              .indexOf(this.tempplayer2.toLowerCase()) > -1
          );
        }
      });
    }
  }

  resetChanges() {
    this.teams = this.teamsUnfiltered;
  }
}
