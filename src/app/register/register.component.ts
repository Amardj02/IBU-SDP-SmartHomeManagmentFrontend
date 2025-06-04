import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  registerError: string | null = null

  constructor(private authService: AuthService, private router:Router) {}

  register(): void {
    this.authService
      .register(this.username, this.password, this.firstName, this.lastName, this.email)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
         this.registerError = "Your registration was not succesful try again."
        }
      );
  }
}