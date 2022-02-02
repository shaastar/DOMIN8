import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PointsHandlerService {
  selectedPoint: number;

  // gameScore = [];
  gameScore: Array<any> = [];

  team1Name: string;
  team2Name: string;
  teamWinnerName: string;

  teams: Array<any> = [];
  constructor() {}

  setSelectedPoint(point) {
    this.setSelectedPoint = point;
  }
}
