import { Injectable } from '@angular/core';
import { IFeatures } from '../types/features.types';

@Injectable()
export class FeaturesService {
  private readonly IFeatures: IFeatures[] = [
    {
      img: './assets/images/customization.jpg',
      alt: 'customization',
      title: 'features.title_1',
      text: 'features.text_1',
    },
    {
      img: './assets/images/statistics.jpg',
      alt: 'statistics',
      title: 'features.title_2',
      text: 'features.text_2',
    },
    {
      img: './assets/images/managment.jpg',
      alt: 'managment',
      title: 'features.title_3',
      text: 'features.text_3',
    },
  ];
  gettFetures() {
    return this.IFeatures;
  }
}
