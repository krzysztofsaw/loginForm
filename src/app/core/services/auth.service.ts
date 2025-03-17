import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  private readonly tokenKey = 'authToken';
  private readonly emailKey = 'userEmail';

  public login(email: string, password: string): Observable<boolean> {
    if (email && password) {
      return this.userService.userExists(email).pipe(
        tap((userExists) => {
          if (userExists) {
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem(this.emailKey, email);
            this.router.navigate(['/dashboard']);
          }
        }),
      );
    } else {
      return of(false);
    }
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public getUserEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }
}
