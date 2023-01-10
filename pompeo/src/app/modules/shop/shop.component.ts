import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetItemsService } from 'src/app/service/get-items.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../types/language.types';
import { SharedModule } from './../../shared/shared.module';
import { CartService } from 'src/app/service/cart.service';
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
  id!: string;
  sub!: Subscription;
  list: IItems[] = [];
  language: Language = this.translateService.currentLang as Language;
  languageSubscription = this.translateService.onLangChange.subscribe(() => {
    this.language = this.translateService.currentLang as Language;
  });

  constructor(
    private route: ActivatedRoute,
    private getItemsService: GetItemsService,
    private readonly translateService: TranslateService,
    private cartService: CartService
  ) {
    this.language;
    this.languageSubscription;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.submit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  addToCart(item: IItems) {
    this.cartService.addToCart(item);
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
