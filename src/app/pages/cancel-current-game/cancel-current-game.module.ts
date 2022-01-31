import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelCurrentGamePageRoutingModule } from './cancel-current-game-routing.module';

import { CancelCurrentGamePage } from './cancel-current-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelCurrentGamePageRoutingModule
  ],
  declarations: [CancelCurrentGamePage]
})
export class CancelCurrentGamePageModule {}
