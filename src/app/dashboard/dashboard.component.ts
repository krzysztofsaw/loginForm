import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  public userData: User | null = null;

  public ngOnInit(): void {
    this.http.get<User>('/assets/user.json').subscribe((data) => {
      this.userData = data;
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
