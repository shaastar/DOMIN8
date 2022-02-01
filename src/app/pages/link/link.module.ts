import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkPageRoutingModule } from './link-routing.module';

import { LinkPage } from './link.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkPageRoutingModule,TranslateModule
  ],
  declarations: [LinkPage]
})
export class LinkPageModule {}
