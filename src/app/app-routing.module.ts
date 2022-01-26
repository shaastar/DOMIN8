import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  {
    path: 'point-select',
    loadChildren: () => import('./pages/point-select/point-select.module').then( m => m.PointSelectPageModule)
  },
  {
    path: 'point-loading',
    loadChildren: () => import('./pages/point-loading/point-loading.module').then( m => m.PointLoadingPageModule)
  },
  {
    path: 'scores',
    loadChildren: () => import('./pages/scores/scores.module').then( m => m.ScoresPageModule)
  },
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
