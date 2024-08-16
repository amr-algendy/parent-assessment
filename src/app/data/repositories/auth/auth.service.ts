import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  login(token: string): void {
    if (token.trim().length > 0) {
      localStorage.setItem('token', token);
      this.loggedIn.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
