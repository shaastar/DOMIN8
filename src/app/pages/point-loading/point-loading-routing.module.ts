import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointLoadingPage } from './point-loading.page';

const routes: Routes = [
  {
    path: '',
    component: PointLoadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointLoadingPageRoutingModule {}
