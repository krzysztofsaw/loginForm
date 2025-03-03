import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  private readonly tokenKey = 'authToken';

  public login(email: string, password: string): void {
    if (email && password) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem(this.tokenKey, token);
      this.router.navigate(['/dashboard']);
    }
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
