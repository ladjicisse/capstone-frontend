import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';
import {SearchService} from '../../services/search.service';
import {ProductPipe} from '../../pipes/product.pipe';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    ProductPipe
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit{
  private router = inject(Router);
  private productService = inject(ProductService);
  private searchService = inject(SearchService);

  protected products = signal<ProductModel[]>(this.productService.getAllProducts());
  protected searchTerm = computed(() => this.searchService.query());

  ngOnInit(): void {

  }

  protected goToDetail(id: number) {
    console.log('Navigating to product detail for ID:', id);
    this.router.navigate(['/products', id]);
  }
}
