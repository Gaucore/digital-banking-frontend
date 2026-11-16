import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

import { SessionService } from '../../globals/session.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const userRole = sessionService.getRole();
  const allowedRoles = route.data['roles'] as string[];
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  if (allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/unauthorized']);

  return false;
};
