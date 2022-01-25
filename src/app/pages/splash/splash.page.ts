import { Component, OnInit } from '@angular/core';
// import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor() // private animationCtrl: AnimationController // hddh
  {
    // this.animationCtrl
    //   .create()
    //   .addElement(document.querySelector('.text-animation'))
    //   .duration(9000)
    //   .iterations(Infinity)
    //   // .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    //   .fromTo('opacity', '0', '1');
  }

  ngOnInit() {}
}
