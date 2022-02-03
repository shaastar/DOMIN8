import { Component, OnInit } from '@angular/core';
import { PointsHandlerService } from '../../services/points-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-point-select',
  templateUrl: './point-select.page.html',
  styleUrls: ['./point-select.page.scss'],
})
export class PointSelectPage implements OnInit {
  customBtn: boolean = false;

  selectedPoint: string;
  selectedPointNumber: number;
  constructor(
    private pointService: PointsHandlerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}
  backBtn() {
    this.location.back();
  }

  toggleCustomPoint() {
    this.customBtn = !this.customBtn;
  }
  addSelectedPoint(point: string) {
    this.selectedPoint = point;
    this.selectedPointNumber = Number(this.selectedPoint);
    this.setSelectedPoint();
  }
  addCustomPoint(inputPoint: string) {
    this.selectedPointNumber = Number(this.selectedPoint);
  }

  setSelectedPoint() {
    console.log(this.selectedPointNumber);
    this.pointService.selectedPoint = this.selectedPointNumber;

    this.router.navigate(['point-loading']);
  }
  // }
  customPointOk() {}
}
