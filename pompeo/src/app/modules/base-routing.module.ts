import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import ProductComponent from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'contacts',
        loadComponent: () => import('./contacts/contacts.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component'),
      },
      {
        path: 'shop',
        loadComponent: () => import('./shop/shop.component'),
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./product/product.component'),
        children: [{ path: 'products/:id', component: ProductComponent }],
      },
      {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component'),
      },
      {
        path: '',
        loadChildren: () => import('./main/main.module'),
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
