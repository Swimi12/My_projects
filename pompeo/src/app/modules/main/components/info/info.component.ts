import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
export class InfoComponent {
  showText: boolean = false;
  showText1: boolean = false;
  state = 'hide';

  constructor(public el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    if (typeof window !== 'undefined') {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition >= componentPosition - 200) {
        this.state = 'show';
      }
    }
  }
}
