import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../core/services/user.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  public userData: User | null = null;

  public ngOnInit(): void {
    const email = this.authService.getUserEmail();
    if (email) {
      this.userService
        .getUserByEmail(email)
        .pipe(
          switchMap((user) => {
            this.userData = user || null;
            return of(user);
          }),
          catchError((error) => {
            console.error('Error loading user data', error);
            return of(null);
          }),
        )
        .subscribe();
    }
  }

  public logout(): void {
    this.authService.logout();
  }
}
