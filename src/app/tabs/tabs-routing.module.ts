import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'language',
        loadChildren: () =>
          import('../pages/language/language.module').then(
            (m) => m.LanguagePageModule
          ),
      },
      {
        path: 'point-select',
        loadChildren: () =>
          import('../pages/point-select/point-select.module').then(
            (m) => m.PointSelectPageModule
          ),
      },
      {
        path: 'scores',
        loadChildren: () =>
          import('../pages/scores/scores.module').then(
            (m) => m.ScoresPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/language',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
  {
    path: 'language',
    redirectTo: '/tabs/language',
    pathMatch: 'full',
  },
  {
    path: 'point-select',
    redirectTo: '/tabs/point-select',
    pathMatch: 'full',
  },
  {
    path: 'scores',
    redirectTo: '/tabs/scores',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
