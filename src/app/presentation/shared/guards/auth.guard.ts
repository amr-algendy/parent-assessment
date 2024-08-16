import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ROUTE_PATHS } from '../../../app.routes';
import { AuthService } from '../../../data/repositories/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (state.url.includes(ROUTE_PATHS.LOGIN)) {
      return this.authService.isLoggedIn()
        ? this.router.createUrlTree(['/', ROUTE_PATHS.DASHBOARD])
        : true;
    }

    return this.authService.isLoggedIn()
      ? true
      : this.router.createUrlTree(['/', ROUTE_PATHS.LOGIN]);
  }
}
