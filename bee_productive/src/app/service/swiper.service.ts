import { Injectable } from '@angular/core';
import { ISwiper } from './../types/swiper.types';

@Injectable()
export class SwiperService {
  private readonly ISwiper: ISwiper[] = [
    {
      text: 'reviews.swiper.text_1',
      src: './assets/images/user_1.png',
      alt: 'user',
      name: 'Serhiy Hipskyy',
      subtext: 'reviews.swiper.subtext_1',
    },
    {
      text: 'reviews.swiper.text_2',
      src: './assets/images/user_2.png',
      alt: 'user',
      name: 'Justus Menke',
      subtext: 'reviews.swiper.subtext_2',
    },
    {
      text: 'reviews.swiper.text_3',
      src: './assets/images/user_3.png',
      alt: 'user',
      name: 'Britain Eriksen',
      subtext: 'reviews.swiper.subtext_3',
    },
    {
      text: 'reviews.swiper.text_4',
      src: './assets/images/user_4.png',
      alt: 'user',
      name: 'Sofi Marso',
      subtext: 'reviews.swiper.subtext_4',
    },
  ];

  getISwiper() {
    return this.ISwiper;
  }
}
