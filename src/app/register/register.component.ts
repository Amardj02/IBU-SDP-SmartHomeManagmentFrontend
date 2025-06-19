import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // Registration fields
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  registerError: string | null = null;

  // User list for deletion
  users: any[] = [];
  apiUrl = 'http://localhost:8000/api/accounts/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Registration method
  register(): void {
    this.authService
      .register(this.username, this.password, this.firstName, this.lastName, this.email)
      .subscribe({
        next: () => {
          this.snackBar.open('User registered successfully!', 'Close', {
            duration: 3000,
          });

          // Reset the form fields
          this.username = '';
          this.password = '';
          this.firstName = '';
          this.lastName = '';
          this.email = '';

          // Optionally navigate somewhere
          // this.router.navigate(['/dashboard']);

          // Reload users to include the new user if desired
          this.loadUsers();
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.snackBar.open('Failed to register user.', 'Close', {
            duration: 3000,
          });
        },
      });
  }

  // Load users excluding superusers
  loadUsers(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${this.apiUrl}list/`, { headers }).subscribe(users => {
      this.users = users.filter(user => !user.is_superuser);
    });
  }

  // Delete a user by ID
  deleteUser(userId: number): void {
    const headers = this.getAuthHeaders();
    this.http.delete(`${this.apiUrl}delete/${userId}/`, { headers }).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
        this.loadUsers(); // Refresh list after deletion
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to delete user.', 'Close', { duration: 3000 });
      }
    });
  }

  // Helper to get auth headers with JWT token
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
