import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  products: ProductModel[] = [
    {
      id: 1,
      name: 'Orange',
      type: 'Vitamins',
      description: 'Jus d\'orange',
      price: 3.50,
      image: 'products/orange.jpg'
    },
    {
      id: 2,
      name: 'Lemon',
      type: 'Detox',
      description: 'Jus de citron',
      price: 4.95,
      image: 'products/lemon.jpg'
    },
    {
      id: 3,
      name: 'Carotte',
      type: 'Vitamins',
      description: 'Jus de carotte',
      price: 6.50,
      image: 'products/carot.jpg'
    },
    {
      id: 4,
      name: 'Percil',
      type: 'Hydration',
      description: 'Jus vert Detox Percil',
      price: 5.95,
      image: 'products/detox-percil.jpg'
    },
    {
      id: 5,
      name: 'Pomme',
      type: 'Hydration',
      description: 'Jus vert pomme & menthe',
      price: 5.95,
      image: 'products/apple-menth.jpg'
    },
    {
      id: 6,
      name: 'Epinard',
      type: 'Hydration',
      description: 'Jus vert épinard',
      price: 5.95,
      image: 'products/detox-spinach.jpg'
    }
  ];

  getAllProducts() {
    // Call API to fetch products
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

}
