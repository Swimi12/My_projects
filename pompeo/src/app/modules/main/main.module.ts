import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { InfoComponent } from './components/info/info.component';
import { CollectionComponent } from './components/collection/collection.component';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { LatetsNewsComponent } from './components/latets-news/latets-news.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    BannerComponent,
    CategoriesComponent,
    InfoComponent,
    CollectionComponent,
    NewCollectionComponent,
    LatetsNewsComponent,
    HttpClientModule,
    SharedModule,
  ],
})
export class MainModule {}
