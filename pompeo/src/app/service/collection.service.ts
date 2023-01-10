import { Injectable } from '@angular/core';
import { IColection } from '../types/collection.types';

@Injectable()
export class CollectionService {
  readonly collectionList: IColection[] = [
    {
      photo: './assets/images/decor-plate.jpg',
      alt: 'decor-plate',
      title: 'main.collection.block.text1',
    },
    {
      photo: './assets/images/mint-pottery.jpg',
      alt: 'mint-pottery',
      title: 'main.collection.block.text2',
    },
    {
      photo: './assets/images/set-of-pottery.jpg',
      alt: 'set-of-pottery',
      title: 'main.collection.block.text3',
    },
    {
      photo: './assets/images/orange-ceramic.jpg',
      alt: 'orange-ceramic',
      title: 'main.collection.block.text4',
    },
    {
      photo: './assets/images/dark-bowl.jpg',
      alt: 'dark-bowl',
      title: 'main.collection.block.text5',
    },
    {
      photo: './assets/images/square-pottery.jpg',
      alt: 'square-pottery',
      title: 'main.collection.block.text6',
    },
  ];
}
