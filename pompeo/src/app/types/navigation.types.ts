export interface INavigation {
  link: string;
  route: NavigationRouteType;
}

export enum NavigationRouteType {
  ABOUT = 'about',
  HOME = '',
  CONTACTS = 'contacts',
  SHOP = 'shop',
}
