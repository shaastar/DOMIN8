import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-current-game',
  templateUrl: './cancel-current-game.page.html',
  styleUrls: ['./cancel-current-game.page.scss'],
})
export class CancelCurrentGamePage implements OnInit {
  lang: string = localStorage.getItem('lang');
  constructor(
    private Translate: TranslateService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.lang = localStorage.getItem('lang');
  }
  backBtn() {
    this.location.back();
  }

  startNewGame() {
    localStorage.setItem('gamescore', null);
    this.router.navigate(['/tabs/point-select']);
  }
}
