import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [authGuard]
  },
  {
    path: 'crisis-center',
    component: CrisisListComponent,
    data: {preload: true}
  },
  {
    path: '',
    redirectTo: '/superheroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      preloadingStrategy: SelectivePreloadingStrategyService
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
