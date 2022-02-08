import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  playClicked = false;
  exploreClicked = false;
  constructor(private router: Router) {}

  play() {
    // this.router.navigate(['/section'], { queryParams: { id: number } });
    this.playClicked = true;
    setTimeout(() => {
        this.playClicked = false;
      }, 5550);
  }

  explore() {
    // this.router.navigate(['/tabs/redirect-instagram']);
    this.exploreClicked = true;
    setTimeout(() => {
      this.exploreClicked = false;
    }, 5550);
  }
}
