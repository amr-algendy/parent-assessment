import { Injectable } from '@angular/core';
import { AuthRepository } from '../../../core/repositories/auth.repository';
import { AuthApisService } from './auth-apis.service';
import { map, Observable, tap, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthImplementationRepository implements AuthRepository {
  constructor(
    private authApisService: AuthApisService,
    private authService: AuthService
  ) {}

  login(params: { email: string; password: string }): Observable<string> {
    return this.authApisService.login(params).pipe(
      map(({ token }) => token),
      tap((token) => {
        this.authService.login(token);
      })
    );
  }

  logout(): Observable<void> {
    this.authService.logout();
    return of(void 0);
  }
}
