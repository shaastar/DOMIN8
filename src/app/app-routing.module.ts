import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
  },
  // {
  //   path: 'point-select',
  //   loadChildren: () =>
  //     import('./pages/point-select/point-select.module').then(
  //       (m) => m.PointSelectPageModule
  //     ),
  // },
  {
    path: 'point-loading',
    loadChildren: () =>
      import('./pages/point-loading/point-loading.module').then(
        (m) => m.PointLoadingPageModule
      ),
  },
  // {
  //   path: 'redirect-link',
  //   loadChildren: () => import('./pages/redirect-link/redirect-link.module').then( m => m.RedirectLinkPageModule)
  // },
  // {
  //   path: 'scores',
  //   loadChildren: () =>
  //     import('./pages/scores/scores.module').then((m) => m.ScoresPageModule),
  // },
  // {
  //   path: 'main-menu',
  //   loadChildren: () =>
  //     import('./pages/main-menu/main-menu.module').then(
  //       (m) => m.MainMenuPageModule
  //     ),
  // },
  // {
  //   path: 'about',
  //   loadChildren: () =>
  //     import('./pages/about/about.module').then((m) => m.AboutPageModule),
  // },
  // {
  //   path: 'teams',
  //   loadChildren: () =>
  //     import('./pages/teams/teams.module').then((m) => m.TeamsPageModule),
  // },
  // {
  //   path: 'calendar',
  //   loadChildren: () =>
  //     import('./pages/calendar/calendar.module').then(
  //       (m) => m.CalendarPageModule
  //     ),
  // },
  // {
  //   path: 'link',
  //   loadChildren: () =>
  //     import('./pages/link/link.module').then((m) => m.LinkPageModule),
  // },
  // {
  //   path: 'congrats',
  //   loadChildren: () =>
  //     import('./pages/congrats/congrats.module').then(
  //       (m) => m.CongratsPageModule
  //     ),
  // },
  // {
  //   path: 'cancel-current-game',
  //   loadChildren: () =>
  //     import('./pages/cancel-current-game/cancel-current-game.module').then(
  //       (m) => m.CancelCurrentGamePageModule
  //     ),
  // },
  // {
  //   path: 'redirect-instagram',
  //   loadChildren: () =>
  //     import('./pages/redirect-instagram/redirect-instagram.module').then(
  //       (m) => m.RedirectInstagramPageModule
  //     ),
  // },
  // {
  //   path: 'language',
  //   loadChildren: () => import('./pages/language/language.module').then( m => m.LanguagePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
