import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { BeeErrorComponent } from './components/bee-error/bee-error.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NotFoundComponent,
    BeeErrorComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    SharedModule
  ]
})
export class NotFoundModule { }
