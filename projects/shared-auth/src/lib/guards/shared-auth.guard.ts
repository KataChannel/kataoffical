import { CanActivateFn } from '@angular/router';

export const sharedAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
