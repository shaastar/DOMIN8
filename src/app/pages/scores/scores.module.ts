import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoresPageRoutingModule } from './scores-routing.module';

import { ScoresPage } from './scores.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoresPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ScoresPage],
})
export class ScoresPageModule {}
