import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointLoadingPageRoutingModule } from './point-loading-routing.module';

import { PointLoadingPage } from './point-loading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointLoadingPageRoutingModule
  ],
  declarations: [PointLoadingPage]
})
export class PointLoadingPageModule {}
