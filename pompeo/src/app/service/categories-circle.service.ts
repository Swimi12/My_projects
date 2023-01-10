import { Injectable } from '@angular/core';
import { ICategoriesCircle } from '../types/categories.types';

@Injectable()
export class CategoriesCircleService {
  readonly categoriesCircle: ICategoriesCircle[] = [
    {
      photo: './assets/images/cat-vases.png',
      alt: 'vases',
      text: 'main.categories.circle.1',
    },
    {
      photo: './assets/images/cat-mugs.png',
      alt: 'mugs',
      text: 'main.categories.circle.2',
    },
    {
      photo: './assets/images/cat-plates.png',
      alt: 'plates',
      text: 'main.categories.circle.3',
    },
  ];
}
