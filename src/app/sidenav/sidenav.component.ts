import { Component, HostBinding, HostListener } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  resizingEvent = {
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0,
  };
  constructor(public sidenavService: SidenavService, public authService: AuthService,private router: Router) {}

  @HostBinding('class.resizing')
  get isResizing(): boolean {
    return this.resizingEvent.isResizing;
  }  

  startResizing(event: MouseEvent): void {
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenavService.sidenavWidth,
    };
  }

@HostListener('window:mousemove', ['$event'])
updateSidenavWidth(event: MouseEvent) {

  if (!this.resizingEvent.isResizing) {
    return;
  }

  const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;

  const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;

  this.sidenavService.setSidenavWidth(newWidth);
}

@HostListener('window:mouseup')
stopResizing() {
  this.resizingEvent.isResizing = false;
}
@HostBinding('class.is-expanded')
get isExpanded() {
  return this.sidenavService.isExpanded;
}
logout(): void {
  this.authService.logout();
  this.router.navigate(['/home']);
}

isLoggedIn(): boolean {
  return this.authService.isAuthenticated();
}
}
