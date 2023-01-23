import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetItemsService } from 'src/app/service/get-items.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../types/language.types';
import { SharedModule } from './../../shared/shared.module';
import { IItems } from 'src/app/types/item.types';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [GetItemsService],
})
export default class ShopComponent implements OnInit, OnDestroy {
  list: IItems[] = [];
  language: Language = this.translateService.currentLang as Language;
  languageSubscription = this.translateService.onLangChange.subscribe(() => {
    this.language = this.translateService.currentLang as Language;
  });

  constructor(
    private getItemsService: GetItemsService,
    private readonly translateService: TranslateService
  ) {
    this.language;
    this.languageSubscription;
  }

  ngOnInit() {
    this.submit();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  submit() {
    this.getItemsService.getItems().subscribe({
      next: (response) => {
        this.list = response;
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }
}
