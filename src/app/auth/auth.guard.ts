import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (next, state) => {

  if(Inject(AuthService).isLoggedIn()) {
    return true;
  }
  return Inject(Router).parseUrl('/');
};
