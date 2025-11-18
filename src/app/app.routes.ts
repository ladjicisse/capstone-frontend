import { Routes } from '@angular/router';
import {MsalGuard} from '@azure/msal-angular';
import {anonymousGuard} from './guards/anonymous.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register), canActivate: [anonymousGuard]},
  { path: 'products/:id', loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile), canActivate: [MsalGuard] },
  { path: 'basket', loadComponent: () => import('./pages/basket/basket').then(m => m.Basket) }
];
