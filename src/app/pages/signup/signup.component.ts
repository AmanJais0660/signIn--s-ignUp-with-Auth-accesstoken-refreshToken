import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [AuthService],
})
export class SignupComponent {
  constructor(private router: Router, private authService: AuthService) {}
  model = {
    name: '',
    email: '',
    password: '',
  };
  errorMessage: string = '';
  onSubmit() {
    this.authService
      .signUp(this.model.name, this.model.email, this.model.password)
      .subscribe(
        (response) => {
          // On successful sign-up, redirect to login or dashboard
          this.router.navigate(['/login']);
        },
        (error) => {
          // Display error message if the sign-up fails
          this.errorMessage = error?.error?.message || 'Something went wrong!';
        }
      );
  }
  goToSignIn() {
    this.router.navigate(['/login']);
  }
}
