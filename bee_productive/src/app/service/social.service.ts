import { Injectable } from '@angular/core';
import { ISocial } from './../types/social.types';

@Injectable()
export class SocialService {
  private readonly ISocial: ISocial[] = [
    {
      href: '#',
      iconHref: '#icon-instagram',
    },
    {
      href: '#',
      iconHref: '#icon-twitter',
    },
    {
      href: '#',
      iconHref: '#icon-facebook',
    },
  ];

  getISocial() {
    return this.ISocial;
  }
}
