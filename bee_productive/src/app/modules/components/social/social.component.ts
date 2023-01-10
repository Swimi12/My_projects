import { Component } from '@angular/core';
import { SocialService } from 'src/app/service/social.service';
import { ISocial } from './../../../types/social.types';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  providers: [SocialService],
})
export class SocialComponent {
  list: ISocial[] = [];

  constructor(private socialService: SocialService) {
    this.list = this.socialService.getISocial();
  }
}
