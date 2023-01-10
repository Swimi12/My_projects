import { Component } from '@angular/core';
import { BannerContentPhotoService } from 'src/app/service/banner-content-photo.service';
import { IContentPhoto } from 'src/app/types/content-photo.types';
import { ISvgStar } from 'src/app/types/svg-star.types';
import { SvgStarService } from '../../../../service/svg-star.service';

@Component({
  selector: 'app-banner-content',
  templateUrl: './banner-content.component.html',
  styleUrls: ['./banner-content.component.scss'],
  providers: [BannerContentPhotoService, SvgStarService],
})
export class BannerContentComponent {
  list: IContentPhoto[] = [];
  listStar: ISvgStar[] = [];

  constructor(
    private bannerContentPhotoService: BannerContentPhotoService,
    private svgStar: SvgStarService
  ) {
    this.list = this.bannerContentPhotoService.getContentPhoto();
    this.listStar = this.svgStar.getSvgStar();
  }
}
