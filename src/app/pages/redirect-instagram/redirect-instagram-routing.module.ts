import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedirectInstagramPage } from './redirect-instagram.page';

const routes: Routes = [
  {
    path: '',
    component: RedirectInstagramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectInstagramPageRoutingModule {}
