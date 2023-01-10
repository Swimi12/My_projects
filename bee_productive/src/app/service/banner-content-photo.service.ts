import { Injectable } from '@angular/core';
import { IContentPhoto } from '../types/content-photo.types';

@Injectable()
export class BannerContentPhotoService {
  private readonly IContentPhoto: IContentPhoto[] = [
    {
      img: './assets/images/banner_people_1.png',
      alt: 'people',
    },
    {
      img: './assets/images/banner_people_2.png',
      alt: 'people',
    },
    {
      img: './assets/images/banner_people_3.png',
      alt: 'people',
    },
  ];

  getContentPhoto() {
    return this.IContentPhoto;
  }
}
