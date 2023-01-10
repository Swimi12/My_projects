import { Injectable } from '@angular/core';
import { ISvgStar } from '../types/svg-star.types';

@Injectable()
export class SvgStarService {
  private readonly svgStar: ISvgStar[] = [
    {
      class: 'star',
    },
    {
      class: 'star',
    },
    {
      class: 'star',
    },
    {
      class: 'star',
    },
    {
      class: 'star star-empty',
    },
  ];
  getSvgStar() {
    return this.svgStar;
  }
}
