import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MsalGuard} from '@azure/msal-angular';
import {Profile} from './profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'profile', component: Profile, canActivate: [MsalGuard] }
];
