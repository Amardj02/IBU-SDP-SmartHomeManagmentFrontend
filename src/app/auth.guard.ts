import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  const isLoggedIn = this.authService.isAuthenticated();
  const isSuperUser = this.authService.isSuperUser();

  if (!isLoggedIn) {
    if (state.url.includes('/rooms')) {
      this.router.navigate(['/login']);
    }
    return false;
  }

  if (state.url.includes('/register') && !isSuperUser) {
    this.router.navigate(['/home']);
    return false;
  }

  if (state.url.includes('/login') && isLoggedIn) {
    this.router.navigate(['/home']);
    return false;
  }
  return true;
}
}
