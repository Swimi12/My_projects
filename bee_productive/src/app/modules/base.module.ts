import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { HeaderComponent } from './components/header/header.component';
import { BurgerComponent } from './components/burger/burger.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialComponent } from './components/social/social.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoComponent } from './components/logo/logo.component';
import { BeeLastComponent } from './components/registration/components/bee-last/bee-last.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    BurgerComponent,
    FooterComponent,
    SocialComponent,
    RegistrationComponent,
    LogoComponent,
    BeeLastComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class BaseModule {}
