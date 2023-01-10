import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INavigation, NavigationRouteType } from '../types/navigation.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly navigationList: INavigation[] = [
    {
      link: 'header.navigation.about',
      route: NavigationRouteType.ABOUT,
    },
    {
      link: 'header.navigation.advantage',
      route: NavigationRouteType.ADVANTAGE,
    },
    {
      link: 'header.navigation.contact',
      route: NavigationRouteType.CONTACTS,
    },
  ];

  readonly anchorNavigationSubject = new Subject<NavigationRouteType>();
}
