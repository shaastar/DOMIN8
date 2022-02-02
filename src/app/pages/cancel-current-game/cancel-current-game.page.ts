import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cancel-current-game',
  templateUrl: './cancel-current-game.page.html',
  styleUrls: ['./cancel-current-game.page.scss'],
})
export class CancelCurrentGamePage implements OnInit {
  lang:string = localStorage.getItem('lang');
  constructor(private Translate: TranslateService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.lang = localStorage.getItem('lang');
  }
}
