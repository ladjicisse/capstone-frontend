import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BasketModel} from '../models/basket.model';

@Pipe({
  name: 'productPipe',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  transform(products: ProductModel[], searchTerm: string): any[] {
    if (!products) return [];
    if (!searchTerm) return products;

    const lower = searchTerm.toLowerCase().trim();

    return (products as ProductModel[]).filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
    );
  }

}
