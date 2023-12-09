// import { Inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

// export const authGuard: CanActivateFn = (next, state) => {

//   if(Inject(AuthService).isLoggedIn()) {
//     return true;
//   }
//   return Inject(Router).parseUrl('/');
// };

Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('AuthGuard#canActivate called');
    return true;
  }

}
