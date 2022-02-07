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
  @Input() teamName: string;
  tempplayer1;
  tempplayer2;

  constructor(
    private location: Location,
    private pointService: PointsHandlerService,
    private modalController: ModalController
  ) {}

  backBtn() {
    this.location.back();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  ngOnInit() {}

  ionViewWillEnter() {}

  addTeam() {
    if (this.teamName == 'EQUIPO I' || this.teamName == 'TEAM I') {
      console.log('team1');
      this.pointService.team1Name1 = this.tempplayer1;
      this.pointService.team1Name2 = this.tempplayer2;
    } else if (this.teamName == 'EQUIPO II' || this.teamName == 'TEAM II') {
      console.log('team2');
      this.pointService.team2Name1 = this.tempplayer1;
      this.pointService.team2Name2 = this.tempplayer2;
    }

    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
