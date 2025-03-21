import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);

  public canActivate(): boolean | UrlTree {
    return (
      !this.authService.isLoggedIn() ||
      this.router.createUrlTree(['/dashboard'])
    );
  }
}
