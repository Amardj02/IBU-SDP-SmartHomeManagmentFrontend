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
    if (this.authService.isAuthenticated()) {
      if (state.url.includes('/login') || state.url.includes('/register')) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      if (state.url.includes('/rooms')) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
