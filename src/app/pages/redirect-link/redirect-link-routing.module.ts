import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedirectLinkPage } from './redirect-link.page';

const routes: Routes = [
  {
    path: '',
    component: RedirectLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectLinkPageRoutingModule {}
