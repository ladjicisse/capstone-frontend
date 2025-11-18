import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

export const anonymousGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.getCurrentAccount()) {
    // User is authenticated → redirect away
    console.log('User is already authenticated. Redirecting to home page.');
    router.navigate(['/']);
    return false;
  }

  // No account → allow access
  console.log('User is not authenticated. Access granted.');
  return true;

};
