import { Component } from '@angular/core';
import { FeaturesService } from '../../../../service/features.service';
import { IFeatures } from '../../../../types/features.types';

@Component({
  selector: 'app-banner-features',
  templateUrl: './banner-features.component.html',
  styleUrls: ['./banner-features.component.scss'],
  providers: [FeaturesService],
})
export class BannerFeaturesComponent {
  list: IFeatures[] = [];

  constructor(private featuresService: FeaturesService) {
    this.list = this.featuresService.gettFetures();
  }
}
