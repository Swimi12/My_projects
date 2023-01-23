import { Injectable } from '@angular/core';
import { IItems } from '../types/item.types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  list: IItems[] = [];

  addToCart(product: IItems) {
    this.list.push({ ...product, count: 1 });
  }

  getItems() {
    return this.list;
  }

  removeItem(index: number) {
    this.list.splice(index, 1);
  }
}
