import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const anonymousGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getCurrentAccount$().pipe(
    map((account) => {
      if (account) {
        // User is authenticated → redirect away
        router.navigate(['/']);
        return false;
      }
      // No account → allow access
      return true;
    })
  );
};
