import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedirectInstagramPageRoutingModule } from './redirect-instagram-routing.module';

import { RedirectInstagramPage } from './redirect-instagram.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedirectInstagramPageRoutingModule, TranslateModule
  ],
  declarations: [RedirectInstagramPage]
})
export class RedirectInstagramPageModule {}
