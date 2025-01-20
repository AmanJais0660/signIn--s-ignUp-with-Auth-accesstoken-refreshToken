import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  email = '';
  password = '';
  goToSignUp() {
    this.router.navigate(['/signup']);
  }
  onSignInSubmit() {
    this.authService.signIn(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']); // Redirect to the dashboard
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
