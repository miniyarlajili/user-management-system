import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.getCurrentUser();

  if (user?.role === 'ADMIN') return true;

  router.navigate(['/dashboard']);
  return false;
};

export const adminOrModGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.getCurrentUser();

  if (user?.role === 'ADMIN' || user?.role === 'MODERATEUR') return true;

  router.navigate(['/dashboard']);
  return false;
};
