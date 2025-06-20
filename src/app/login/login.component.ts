import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  loginError: string | null = null;

  // Forgot password related
  showForgotPassword = false;
  resetEmail = '';
  resetMessage = '';
  resetError = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loginError = null;
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Router navigation is handled inside AuthService.login()
      },
      (error) => {
        console.error('Login failed', error);
        this.loginError = 'Invalid username or password';
      }
    );
  }

  toggleForgotPassword(): void {
    this.showForgotPassword = !this.showForgotPassword;
    this.resetEmail = '';
    this.resetMessage = '';
    this.resetError = '';
  }

  requestPasswordReset(): void {
    this.resetMessage = '';
    this.resetError = '';
    if (!this.resetEmail) {
      this.resetError = 'Please enter your email';
      return;
    }
    this.authService.requestPasswordReset(this.resetEmail).subscribe(
      (res) => {
        this.resetMessage =
          'If an account with that email exists, a password reset link has been sent.';
      },
      (err) => {
        this.resetError =
          err.error?.message || 'An error occurred. Please try again later.';
      }
    );
  }
}
