import { Routes } from '@angular/router';
import {MsalGuard} from '@azure/msal-angular';
import {anonymousGuard} from './guards/anonymous.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
  { path: 'products/:id', loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'basket', loadComponent: () => import('./pages/basket/basket').then(m => m.Basket) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register), canActivate: [anonymousGuard], data: { hideSearch: true }},
  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile), canActivate: [MsalGuard] }
];
