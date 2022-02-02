import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';

import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

@Component({
  selector: 'app-point-loading',
  templateUrl: './point-loading.page.html',
  styleUrls: ['./point-loading.page.scss'],
})
export class PointLoadingPage implements OnInit {
  selectedPointNumber: number = this.pointService.selectedPoint;
  constructor(
    private pointService: PointsHandlerService,
    private router: Router,
    private insomnia: Insomnia
  ) {}

  ionViewWillEnter() {
    this.insomnia.keepAwake().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }
  ionViewDidLeave() {
    this.insomnia.allowSleepAgain().then(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['scores']);
    }, 5000);
  }
}
