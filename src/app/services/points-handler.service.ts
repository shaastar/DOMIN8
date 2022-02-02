import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsHandlerService {

  selectedPoint: number;
  constructor() { }

  setSelectedPoint(point){
    this.setSelectedPoint = point;
  }
}
