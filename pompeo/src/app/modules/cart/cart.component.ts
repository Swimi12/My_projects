import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { Language } from 'src/app/types/language.types';
import { TranslateService } from '@ngx-translate/core';
import { InputTypes } from 'src/app/types/input.types';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IItems } from './../../types/item.types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export default class CartComponent implements OnDestroy {
  list: IItems[] = [];
  InputTypes = InputTypes;
  language: Language = this.translateService.currentLang as Language;
  languageSubscription = this.translateService.onLangChange.subscribe(() => {
    this.language = this.translateService.currentLang as Language;
  });

  constructor(
    private cartService: CartService,
    private readonly translateService: TranslateService
  ) {
    this.language;
    this.languageSubscription;
    this.list = this.cartService.getItems();
    this.calculatedTotalPrice();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  deleteItem(index: number) {
    this.cartService.removeItem(index);
    this.calculatedTotalPrice();
  }

  cancel(position: number) {
    return (this.list[position].count = 1);
  }

  checkMaxAmount(position: number) {
    return (this.list[position].count = this.list[position].amount);
  }

  calculatedTotalPrice() {
    let total: number = 0;
    this.list.forEach((elem) => {
      total += elem.count! * elem.price;
    });
    return total;
  }

  increaseAmount(position: number) {
    return this.list[position].count!++;
  }

  reduceAmount(position: number) {
    return this.list[position].count!--;
  }
}
