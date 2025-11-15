import {Injectable, signal, computed, inject} from '@angular/core';
import {BasketModel} from '../models/basket.model';

@Injectable({ providedIn: 'root' })
export class BasketStore {

  private stored: BasketModel[] = JSON.parse(localStorage.getItem('basket') || '[]');

  items = signal<BasketModel[]>(this.stored);

  totalAmount = computed(() =>
    this.items()
      .reduce((acc, it) => acc + it.product.price * it.quantity, 0)
  );

  itemsCount = computed(() =>
    this.items()
      .reduce((acc, it) => acc + it.quantity, 0)
  );

  private save() {
    localStorage.setItem('basket', JSON.stringify(this.items()));
  }

  add(product: any, qty: number) {
    const basket = [...this.items()];
    const existing = basket.find(i => i.product.id === product.id);

    if (existing)
      existing.quantity += qty;
    else
      basket.push({ product, quantity: qty });

    this.items.set(basket);
    this.save();
  }

  updateQuantity(index: number, quantity: number) {
    const basket = [...this.items()];
    basket[index].quantity = quantity;
    this.items.set(basket);
    this.save();
  }

  remove(index: number) {
    const basket = [...this.items()];
    basket.splice(index, 1);
    this.items.set(basket);
    this.save();
  }

  clear() {
    this.items.set([]);
    this.save();
  }
}
