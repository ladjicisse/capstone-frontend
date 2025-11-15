import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {ProductModel} from '../../models/product.model';
import {FormsModule} from '@angular/forms';
import {BasketStore} from '../../store/basket.store';

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
 // private ProductType: "Detox" | "Hydration" | "Vitamins";

  constructor(
    private route: ActivatedRoute,
    //private productService: ProductService,
    //private basketService: BasketService,
    private basketStore: BasketStore,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.product = this.productService.getProductById(id);
    this.product.set({
      id: id,
      name: 'Orange',
      type: 'Detox',
      description: 'Jus d\'orange',
      price: 3.50,
      image: 'products/orange.jpg'
    });
  }

  increaseQty() {
    this.quantity.update(qty => qty + 1);
  }

  decreaseQty() {
    if (this.quantity() > 1) this.quantity.update(qty => qty - 1);
  }

  updateQty(value: number) {
    const qty = Number(value);
    this.quantity.set(qty > 0 ? qty : 1);
  }

  addToBasket() {
    this.basketStore.add(this.product() as ProductModel, this.quantity());

    console.log("Added to basket:", this.product()?.name, "x", this.quantity());
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
