// import { Inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// export const authGuard: CanActivateFn = (next, state) => {

//   if(Inject(AuthService).isLoggedIn()) {
//     return true;
//   }
//   return Inject(Router).parseUrl('/');
// };

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree {

    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }


  checkLogin(url: string): boolean | UrlTree {

    if(this.authService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // create dummy session id
    const sessionId = 123456789;

    // set navigation extra object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: {session_Id: sessionId},
      fragment: 'anchor'
    };

    // Redirect to the login page
    // this.router.navigate(['/login']);
    // return false
    return this.router.createUrlTree(['/login'],navigationExtras);
  }

}
