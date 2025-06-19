import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userData = { first_name: '', last_name: '', email: '' };
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  showCurrent = false;
  showNew = false;
  showConfirm = false;

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      this.userData = data;
    });
  }

  updateProfile() {
    this.authService.updateProfile(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error updating profile';
        this.successMessage = '';
      }
    });
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.errorMessage = '';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Password update failed';
        this.successMessage = '';
      }
    });
  }

  toggleShow(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') this.showCurrent = !this.showCurrent;
    else if (field === 'new') this.showNew = !this.showNew;
    else if (field === 'confirm') this.showConfirm = !this.showConfirm;
  }

  showProfileForm = false;
  showPasswordForm = false;

  toggleSection(section: 'profile' | 'password') {
    if (section === 'profile') {
      this.showProfileForm = !this.showProfileForm;
      this.showPasswordForm = false;
    } else {
      this.showPasswordForm = !this.showPasswordForm;
      this.showProfileForm = false;
    }

    this.successMessage = '';
    this.errorMessage = '';
  }
}
