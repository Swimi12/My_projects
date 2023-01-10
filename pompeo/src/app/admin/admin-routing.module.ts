import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import UpdateItemComponent from './components/update-item/update-item.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add-item',
        loadComponent: () => import('./components/additems/additems.component'),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./components/update-item/update-item.component'),
        children: [{ path: 'products/:id', component: UpdateItemComponent }],
      },
      {
        path: '',
        loadComponent: () =>
          import('./components/admin-main/admin-main.component'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
