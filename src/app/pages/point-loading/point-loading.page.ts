import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-loading',
  templateUrl: './point-loading.page.html',
  styleUrls: ['./point-loading.page.scss'],
})
export class PointLoadingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['scores']);
    }, 5000);
  }
}
