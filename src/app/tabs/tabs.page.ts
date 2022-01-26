import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private router: Router) {}

  play() {
    // this.router.navigate(['/section'], { queryParams: { id: number } });
    this.router.navigate(['/tabs/point-select']);
  }

  explore() {
    this.router.navigate(['/tabs/tab2']);
  }
}
