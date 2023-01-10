export interface INavigation {
  link: string;
  route: NavigationRouteType;
}

export enum NavigationRouteType {
  ABOUT = 'about',
  ADVANTAGE = 'advantage',
  CONTACTS = 'contact',
}
