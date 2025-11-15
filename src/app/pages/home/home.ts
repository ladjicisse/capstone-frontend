import { Component } from '@angular/core';
import {Products} from '../products/products';

@Component({
  selector: 'app-home',
  imports: [
    Products
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
