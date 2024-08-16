import { Component } from '@angular/core';
import { AuthService } from '../../data/repositories/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  loggedIn$!: BehaviorSubject<boolean>;

  ngOnInit(): void {
    this.loggedIn$ = this.authService.loggedIn;
  }
}
