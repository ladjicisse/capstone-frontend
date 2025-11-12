import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {MsalGuard} from '@azure/msal-angular';
import {Register} from './pages/register/register';
import {anonymousGuard} from './guards/anonymous.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register, canActivate: [anonymousGuard] },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile), canActivate: [MsalGuard] },
  { path: 'products', loadComponent: () => import('./pages/products/products').then(m => m.Products), canActivate: [MsalGuard] }
];
