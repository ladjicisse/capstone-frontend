import {Component, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {provideRouter, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products = signal([
    {
      id: 1,
      title: 'Orange',
      description: 'Jus d\'orange',
      price: 3.50,
      photo: 'products/orange.jpg'
    },
    {
      id: 2,
      title: 'Lemon',
      description: 'Jus de citron',
      price: 4.95,
      photo: 'products/lemon.jpg'
    },
    {
      id: 3,
      title: 'Carotte',
      description: 'Jus de carotte',
      price: 6.50,
      photo: 'products/carot.jpg'
    },
    {
      id: 4,
      title: 'Percil',
      description: 'Jus vert Detox Percil',
      price: 5.95,
      photo: 'products/detox-percil.jpg'
    },
    {
      id: 5,
      title: 'Pomme',
      description: 'Jus vert pomme & menthe',
      price: 5.95,
      photo: 'products/apple-menth.jpg'
    },
    {
      id: 6,
      title: 'Epinard',
      description: 'Jus vert épinard',
      price: 5.95,
      photo: 'products/detox-spinach.jpg'
    }
  ]);

  constructor(private router: Router) {
  }

  protected goToDetail(id: number) {
    console.log('Navigating to product detail for ID:', id);
    this.router.navigate(['/products', id]);
  }
}
