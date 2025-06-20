import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'SmartWeb';
  isLoggedIn = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
   ngOnInit(): void {
      this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      const currentUrl = this.router.url;

      // Redirect to home only if logged out AND not on public pages like reset-password or login
      if (!status && !['/reset-password', '/login', '/'].includes(currentUrl)) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}