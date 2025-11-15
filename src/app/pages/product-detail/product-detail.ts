import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  product!: any;

  constructor(
    private route: ActivatedRoute,
    //private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.product = this.productService.getProductById(id);
    this.product = {id: id, title: 'Orange', description: 'Jus d\'orange', price: 3.50, photo: 'products/orange.jpg'}
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  buyProduct(id: number) {
    console.log("Buying product:", id);
  }
}
