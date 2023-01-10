import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategoriesCircle } from 'src/app/types/categories.types';
import { CategoriesCircleService } from 'src/app/service/categories-circle.service';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesCircleService],
  animations: [
    trigger('fadeInRight', [
      state('show', style({ opacity: 1, transform: 'translateX(0px)' })),
      state('hide', style({ opacity: 0, transform: 'translateX(80px)' })),
      transition('hide => show', animate('700ms ease-in')),
    ]),
    trigger('fadeInLeft', [
      state('show', style({ opacity: 1, transform: 'translateX(0px)' })),
      state('hide', style({ opacity: 0, transform: 'translateX(-80px)' })),
      transition('hide => show', animate('700ms ease-in')),
    ]),
  ],
})
export class CategoriesComponent {
  circleList: ICategoriesCircle[] = [];
  state = 'hide';

  constructor(
    private categoriesCircleService: CategoriesCircleService,
    public el: ElementRef
  ) {
    this.circleList = this.categoriesCircleService.categoriesCircle;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    if (typeof window !== 'undefined') {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition >= componentPosition - 100) {
        this.state = 'show';
      }
    }
  }
}
