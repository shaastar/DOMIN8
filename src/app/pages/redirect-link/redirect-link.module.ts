import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedirectLinkPageRoutingModule } from './redirect-link-routing.module';

import { RedirectLinkPage } from './redirect-link.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedirectLinkPageRoutingModule,
    TranslateModule,
  ],
  declarations: [RedirectLinkPage],
})
export class RedirectLinkPageModule {}
