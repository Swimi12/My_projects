import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from 'src/app/service/navigation.service';
import {
  INavigation,
  NavigationRouteType,
} from 'src/app/types/navigation.types';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/types/language.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  navigationList: INavigation[] = [];
  isShowNavigation: boolean = false;
  isMobileMode: boolean = false;
  isShowRegistration: boolean = false;
  language = Language;

  constructor(
    private navigationService: NavigationService,
    private readonly translateService: TranslateService
  ) {
    this.navigationList = this.navigationService.navigationList;
    window.addEventListener('resize', () => this.resize());
    this.isMobileMode = window.innerWidth < 1024;
  }

  scrollToElement(route: NavigationRouteType) {
    this.navigationService.anchorNavigationSubject.next(route);
  }

  changeLanguage(lang: Language) {
    this.translateService.use(lang);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resize);
  }

  private resize() {
    this.isMobileMode = window.innerWidth < 1024;
    if (!this.isMobileMode) {
      this.isShowNavigation = false;
    }
  }
}
