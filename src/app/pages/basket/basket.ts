import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {BasketModel} from '../../models/basket.model';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-basket',
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket {
  basketService = inject(BasketService);

  items: BasketModel[] = this.basketService.getItems();
  subtotal = 0;

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.subtotal = this.items
      .map(i => i.product.price * i.quantity)
      .reduce((a, b) => a + b, 0);
  }

  increaseQty(i: number) {
    this.items[i].quantity++;
    this.calculateTotal();
  }

  decreaseQty(i: number) {
    if (this.items[i].quantity > 1) {
      this.items[i].quantity--;
    }
    this.calculateTotal();
  }

  updateQty(i: number, value: number) {
    this.items[i].quantity = Math.max(1, Number(value));
    this.calculateTotal();
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
    this.calculateTotal();
  }

  payNow() {
    alert('Payment process not implemented yet 🚀');
  }
}
