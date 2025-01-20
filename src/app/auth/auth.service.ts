import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API base URL
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  // Sign up
  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  // Sign in
  signIn(email: string, password: string): Observable<any> {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.apiUrl}/signin`,
        { email, password }
      )
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens.accessToken, tokens.refreshToken);
        })
      );
  }

  // Refresh token
  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/token`, { refreshToken })
      .pipe(
        tap((response) => {
          this.storeTokens(response.accessToken, refreshToken!);
        })
      );
  }

  // Logout
  logout(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe(() => {
      this.clearTokens();
    });
  }

  // Helper methods
  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.tokenSubject.next(accessToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
