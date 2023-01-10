import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
      {
        path: '404',
        loadChildren: () =>
          import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
