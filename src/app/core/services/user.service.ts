import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);

  public getUserByEmail(email: string): Observable<User | undefined> {
    return this.http
      .get<User[]>('/assets/users.json')
      .pipe(map((users) => users.find((user) => user.email === email)));
  }

  public userExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }
}
