import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointSelectPageRoutingModule } from './point-select-routing.module';

import { PointSelectPage } from './point-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointSelectPageRoutingModule
  ],
  declarations: [PointSelectPage]
})
export class PointSelectPageModule {}
