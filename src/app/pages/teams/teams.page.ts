import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  backBtn() {
    this.location.back();
  }
}
