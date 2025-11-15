import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {provideRouter, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit{
  private router = inject(Router);
  private productService = inject(ProductService);

  protected products = signal<ProductModel[]>(this.productService.getAllProducts());

  ngOnInit(): void {

  }

  protected goToDetail(id: number) {
    console.log('Navigating to product detail for ID:', id);
    this.router.navigate(['/products', id]);
  }
}
