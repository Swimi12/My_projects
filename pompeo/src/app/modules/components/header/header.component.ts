import { Component, OnDestroy, AfterContentChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavigation } from 'src/app/types/navigation.types';
import { NavigationService } from 'src/app/service/navigation.service';
import { LogoComponent } from '../logo/logo.component';
import { BurgerComponent } from '../burger/burger.component';
import { Language } from 'src/app/types/language.types';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseRoutingModule } from './../../base-routing.module';
import { CartService } from './../../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NavigationService],
  imports: [
    CommonModule,
    LogoComponent,
    BurgerComponent,
    SharedModule,
    BaseRoutingModule,
  ],
})
export class HeaderComponent implements OnDestroy, AfterContentChecked {
  navigationList: INavigation[] = [];
  isShowNavigation: boolean = false;
  isMobileMode: boolean = false;
  language = Language;
  amountOfCart: number = 0;

  constructor(
    private navigationService: NavigationService,
    private readonly translateService: TranslateService,
    private cartService: CartService
  ) {
    this.navigationList = this.navigationService.navigationList;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.resize());
      this.isMobileMode = window.innerWidth < 1024;
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resize);
    }
  }

  ngAfterContentChecked() {
    if (this.cartService.list.length >= 0) {
      this.amountOfCart = this.cartService.list.length;
    }
  }

  changeLanguage(lang: Language) {
    this.translateService.use(lang);
  }

  private resize() {
    console.log('this.isMobileMode: ', this.isMobileMode);
    console.log('this.isShowNavigation: ', this.isShowNavigation);
    if (typeof window !== 'undefined') {
      this.isMobileMode = window.innerWidth < 1024;
      if (!this.isMobileMode) {
        this.isShowNavigation = false;
      }
    }
  }
}
