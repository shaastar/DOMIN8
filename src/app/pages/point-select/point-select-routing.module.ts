import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointSelectPage } from './point-select.page';

const routes: Routes = [
  {
    path: '',
    component: PointSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointSelectPageRoutingModule {}
