import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    // Subscribe to the auth status observable
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (!status) {
        // Redirect to home after logout
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