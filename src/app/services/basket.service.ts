import { Injectable } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BasketModel} from '../models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private items: BasketModel[] = [];

  add(item: { product: ProductModel; quantity: number }) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }
}
