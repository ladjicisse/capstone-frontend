import {Component, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {ProductModel} from '../../models/product.model';
import {FormsModule} from '@angular/forms';
import {BasketStore} from '../../store/basket.store';
import {ProductService} from '../../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  public product = signal<ProductModel | null>(null);
  public quantity = signal(0);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basketStore: BasketStore,
    private location: Location
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product.set(this.productService.getProductById(id) || null);
  }

  increaseQty() {
    this.quantity.update(qty => qty + 1);
  }

  decreaseQty() {
    if (this.quantity() >= 1) this.quantity.update(qty => qty - 1);
  }

  addToBasket() {
    this.basketStore.add(this.product() as ProductModel, this.quantity());

    console.log("Added to basket:", this.product()?.name, "x", this.quantity());
  }

  goBack() {
    this.location.back();
  }
}
