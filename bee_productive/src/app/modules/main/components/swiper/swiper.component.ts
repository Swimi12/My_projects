import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SwiperService } from 'src/app/service/swiper.service';
import { ISwiper } from 'src/app/types/swiper.types';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  providers: [SwiperService],
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;
  swiper!: Swiper;
  list: ISwiper[] = [];

  constructor(private swiperService: SwiperService) {
    this.list = this.swiperService.getISwiper();
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  private initSwiper() {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      slidesPerView: 3,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        260: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1170: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
    this.swiper.slideNext();
  }
}
