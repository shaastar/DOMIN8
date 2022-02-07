import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-loading',
  templateUrl: './point-loading.page.html',
  styleUrls: ['./point-loading.page.scss'],
})
export class PointLoadingPage implements OnInit {
  selectedPointNumber: number = this.pointService.selectedPoint;
  constructor(
    private pointService: PointsHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['tabs/scores']);
    }, 2000);
  }
}
