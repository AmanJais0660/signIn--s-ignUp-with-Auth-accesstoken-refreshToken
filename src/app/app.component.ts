import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, NavbarComponent, RouterModule],
  // standalone: true,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    // Hide navbar on login and signup pages
    return this.router.url === '/signup' || this.router.url === '/login';
  }
}
