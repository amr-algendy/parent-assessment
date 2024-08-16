import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginUsecase } from '../../core/usecases/auth/login.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  loading = false;

  constructor(private loginUsecase: LoginUsecase, private router: Router) {}

  onSubmitForm(): void {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.loading = true;
      this.loginUsecase.execute({ email, password }).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
