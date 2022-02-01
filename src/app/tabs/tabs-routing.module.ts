import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
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
        path: 'main-menu',
        loadChildren: () =>
          import('../pages/main-menu/main-menu.module').then(
            (m) => m.MainMenuPageModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../pages/about/about.module').then((m) => m.AboutPageModule),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('../pages/teams/teams.module').then((m) => m.TeamsPageModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../pages/calendar/calendar.module').then(
            (m) => m.CalendarPageModule
          ),
      },
      {
        path: 'link',
        loadChildren: () =>
          import('../pages/link/link.module').then((m) => m.LinkPageModule),
      },
      {
        path: 'congrats',
        loadChildren: () =>
          import('../pages/congrats/congrats.module').then(
            (m) => m.CongratsPageModule
          ),
      },
      {
        path: 'cancel-current-game',
        loadChildren: () =>
          import(
            '../pages/cancel-current-game/cancel-current-game.module'
          ).then((m) => m.CancelCurrentGamePageModule),
      },
      {
        path: 'redirect-instagram',
        loadChildren: () =>
          import(
            '../pages/redirect-instagram/redirect-instagram.module'
          ).then((m) => m.RedirectInstagramPageModule),
      },
      {
        path: 'redirect-link',
        loadChildren: () =>
          import(
            '../pages/redirect-link/redirect-link.module'
          ).then((m) => m.RedirectLinkPageModule),
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
    redirectTo: '/tabs/language',
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
  {
    path: 'main-menu',
    redirectTo: '/tabs/main-menu',
    pathMatch: 'full',
  },
  {
    path: 'about',
    redirectTo: '/tabs/about',
    pathMatch: 'full',
  },
  {
    path: 'teams',
    redirectTo: '/tabs/teams',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    redirectTo: '/tabs/calendar',
    pathMatch: 'full',
  },
  {
    path: 'link',
    redirectTo: '/tabs/link',
    pathMatch: 'full',
  },
  {
    path: 'congrats',
    redirectTo: '/tabs/congrats',
    pathMatch: 'full',
  },
  {
    path: 'cancel-current-game',
    redirectTo: '/tabs/cancel-current-game',
    pathMatch: 'full',
  },
  {
    path: 'redirect-instagram',
    redirectTo: '/tabs/redirect-instagram',
    pathMatch: 'full',
  },
  {
    path: 'redirect-link',
    redirectTo: '/tabs/redirect-link',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
