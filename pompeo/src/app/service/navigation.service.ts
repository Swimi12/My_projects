import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INavigation, NavigationRouteType } from '../types/navigation.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly navigationList: INavigation[] = [
    {
      link: 'header.navigation.home',
      route: NavigationRouteType.HOME,
    },
    {
      link: 'header.navigation.about',
      route: NavigationRouteType.ABOUT,
    },
    {
      link: 'header.navigation.contacts',
      route: NavigationRouteType.CONTACTS,
    },
    {
      link: 'header.navigation.shop',
      route: NavigationRouteType.SHOP,
    },
  ];

  readonly anchorNavigationSubject =
    new BehaviorSubject<NavigationRouteType | null>(null);
}
