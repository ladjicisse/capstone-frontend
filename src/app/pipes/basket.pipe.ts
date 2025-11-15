import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from '../models/product.model';
import {BasketModel} from '../models/basket.model';

@Pipe({
  name: 'basketPipe',
  standalone: true
})
export class BasketPipe implements PipeTransform {

  transform(basket: BasketModel[], searchTerm: string): any[] {
    if (!basket) return [];
    if (!searchTerm) return basket;

    const lower = searchTerm.toLowerCase().trim();

    return (basket as BasketModel[]).filter(p =>
      p.product.name.toLowerCase().includes(lower) ||
      p.product.description.toLowerCase().includes(lower)
    );
  }

}
