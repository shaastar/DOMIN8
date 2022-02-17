import { Component, OnInit, Input } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { AlertController, ModalController } from '@ionic/angular';
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
    private modalController: ModalController,
    private alertController: AlertController
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
    if (this.teamSide == 'team I') {
      if (
        this.pointService.team2Name1 != this.tempplayer1 &&
        this.pointService.team2Name1 != this.tempplayer2
      ) {
        console.log('team1');
        if (this.tempplayer1 && this.tempplayer2) {
          this.pointService.team1Name1 = this.tempplayer1;
          this.pointService.team1Name2 = this.tempplayer2;
        } else if (this.tempplayer1) {
          this.pointService.team1Name1 = this.tempplayer1;
          this.pointService.team1Name2 = null;
        } else {
          this.pointService.team1Name1 = this.tempplayer2;
          this.pointService.team1Name2 = null;
        }
      }
    }
    if (this.teamSide == 'team II') {
      if (
        this.pointService.team1Name1 != this.tempplayer1 &&
        this.pointService.team1Name1 != this.tempplayer2
      ) {
        console.log('team2');
        if (this.tempplayer1 && this.tempplayer2) {
          this.pointService.team2Name1 = this.tempplayer1;
          this.pointService.team2Name2 = this.tempplayer2;
        } else if (this.tempplayer1) {
          this.pointService.team2Name1 = this.tempplayer1;
          this.pointService.team2Name2 = null;
        } else {
          this.pointService.team2Name1 = this.tempplayer2;
          this.pointService.team2Name2 = null;
        }
      }
    }

    this.tempplayer1 = '';
    this.tempplayer2 = '';
    this.dismiss();
  }

  team1Changed() {
    if (localStorage.getItem('teams') != null) {
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
  }

  team2Changed() {
    if (localStorage.getItem('teams') != null) {
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
  }
  resetChanges() {
    this.teams = this.teamsUnfiltered;
  }

  async deleteTeam(event, delTeam) {
    event.stopPropagation();
    let lang = localStorage.getItem('lang');
    const alert = await this.alertController.create({
      header: lang == 'sp' ? 'ELIMINAR EQUIPO' : 'DELETE TEAM',
      message:
        lang == 'sp'
          ? 'El equipo seleccionado será eliminado. ¿Deseas proceder?'
          : 'The team selected will be eliminated. Do you wish to proceed?',
      buttons: [
        {
          text: lang == 'sp' ? 'CONTINUAR' : 'CONTINUE',
          cssClass: 'continue-btn',
          handler: () => {
            this.teams = this.teams.filter((team) => {
              return !(
                team.teamname1 == delTeam.teamname1 &&
                team.teamname2 == delTeam.teamname2
              );
            });
            localStorage.setItem('teams', JSON.stringify(this.teams));
          },
        },
        {
          text: lang == 'sp' ? 'CANCELAR' : 'CANCEL',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {},
        },
      ],
      cssClass: 'alert-all',
    });
    await alert.present();
  }
}
