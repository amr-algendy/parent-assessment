import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    if (token.trim().length > 0) {
      localStorage.setItem('token', token);
      this.loggedInSubject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }
}
