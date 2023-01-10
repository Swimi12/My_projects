import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsService } from './../../service/about-us.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IAbout } from 'src/app/types/about.types';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [AboutUsService],
})
export default class AboutComponent {
  itemList: IAbout[] = [];

  constructor(private aboutUsService: AboutUsService) {
    this.itemList = this.aboutUsService.aboutList;
  }
}
