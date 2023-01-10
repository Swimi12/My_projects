import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BannerComponent } from './components/banner/banner.component';
import { BannerBeeComponent } from './components/banner-bee/banner-bee.component';
import { BannerContentComponent } from './components/banner-content/banner-content.component';
import { BannerFeaturesComponent } from './components/banner-features/banner-features.component';
import { AboutComponent } from './components/about/about.component';
import { AdvantageComponent } from './components/advantage/advantage.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    MainComponent,
    BannerComponent,
    BannerBeeComponent,
    BannerContentComponent,
    BannerFeaturesComponent,
    AboutComponent,
    AdvantageComponent,
    ReviewsComponent,
    SwiperComponent,
    ContactsComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MainRoutingModule,
    SharedModule,
    TranslateModule,
  ],
})
export class MainModule {}
