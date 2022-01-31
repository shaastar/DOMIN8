import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelCurrentGamePage } from './cancel-current-game.page';

const routes: Routes = [
  {
    path: '',
    component: CancelCurrentGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelCurrentGamePageRoutingModule {}
