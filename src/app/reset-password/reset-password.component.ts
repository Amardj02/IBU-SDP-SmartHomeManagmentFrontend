import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  // Add these properties
  uidb64: string = '';
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

 ngOnInit(): void {
  console.log('ResetPasswordComponent initialized');
  this.route.queryParams.subscribe(params => {
    console.log('Query params:', params);
    this.uidb64 = params['uidb64'];
    this.token = params['token'];
  });
}

  // Add this method
  resetPassword() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    this.authService
      .resetPassword(this.password, this.token, this.uidb64)
      .subscribe({
        next: () => {
          this.successMessage = 'Password has been reset successfully!';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Password reset failed.';
          this.loading = false;
        },
      });
  }
}
