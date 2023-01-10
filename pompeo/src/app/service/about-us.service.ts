import { Injectable } from '@angular/core';
import { IAbout } from '../types/about.types';

@Injectable()
export class AboutUsService {
  readonly aboutList: IAbout[] = [
    {
      class: 'content',
      photo: './assets/images/about.jpg',
      photoClass: 'photo',
      alt: 'about',
      title: 'about.info.title',
      text: 'about.info.p',
    },
    {
      class: 'content content-reverse',
      photo: './assets/images/about_home.jpg',
      photoClass: 'photo photo-reverse',
      alt: 'about',
      title: 'about.info.title1',
      text: 'about.info.p1',
    },
    {
      class: 'content',
      photo: './assets/images/about_set.jpg',
      photoClass: 'photo',
      alt: 'about',
      title: 'about.info.title2',
      text: 'about.info.p2',
    },
  ];
}
