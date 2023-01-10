import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    HeaderComponent,
    FooterComponent,
    SharedModule,
  ],
})
export class BaseModule {}
