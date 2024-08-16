import { Component } from '@angular/core';
import { AuthService } from '../../data/repositories/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ROUTE_PATHS } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loggedIn$!: BehaviorSubject<boolean>;

  ngOnInit(): void {
    this.loggedIn$ = this.authService.loggedInSubject;
  }

  buttonClicked(): void {
    const loggedIn = this.loggedIn$.getValue();

    if (loggedIn) {
      this.authService.logout();
    }
    this.router.navigate(['/', ROUTE_PATHS.LOGIN]);
  }
}
