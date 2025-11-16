import {Component, computed, inject} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BasketStore} from '../../store/basket.store';
import {SearchService} from '../../services/search.service';
import {BasketPipe} from '../../pipes/basket.pipe';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [
    FormsModule,
    CurrencyPipe,
    BasketPipe,
    RouterLink
  ],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket {
  basketStore = inject(BasketStore)
  searchService = inject(SearchService);
  private router: Router = inject(Router);

  items = computed(()=> this.basketStore.items());// signal
  totalAmount = computed( () => this.basketStore.totalAmount());   // computed

  protected searchTerm = computed(() => this.searchService.query());

  increaseQty(i: number) {
    const item = this.items()[i];
    this.basketStore.updateQuantity(i, item.quantity + 1);
  }

  decreaseQty(i: number) {
    const item = this.items()[i];
    if (item.quantity > 1) {
      this.basketStore.updateQuantity(i, item.quantity - 1);
    }
  }

  updateQty(i: number, value: number) {
    const qty = Math.max(1, Number(value));
    this.basketStore.updateQuantity(i, qty);
  }

  removeItem(i: number) {
    this.basketStore.remove(i);
  }

  removeAllItems() {
    this.basketStore.clear();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  payNow() {
    alert('Payment process not implemented yet 🚀');
  }
}
