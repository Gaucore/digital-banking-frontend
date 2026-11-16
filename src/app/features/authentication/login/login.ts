import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../../../globals/session.service';
import { GlobalMessage } from '../../../globals/global-message';
import { LoginRequest } from '../../../models/request/auth/login.request';
import { LoginResponse } from '../../../models/response/auth/login.response';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private globalMessage: GlobalMessage,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    console.log('Login button clicked');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    console.log(this.loginForm.value);

    this.isSubmitting = true;

    const request: LoginRequest = this.loginForm.value;

    this.authService.login(request).subscribe({
      next: (response: LoginResponse) => {
        this.isSubmitting = false;

        this.sessionService.saveSession(response.token, response.username, response.role);

        this.globalMessage.success('Login Successful');

        switch (response.role) {
          case 'ADMIN':
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'EMPLOYEE':
            this.router.navigate(['/employee/dashboard']);
            break;

          default:
            this.router.navigate(['/login']);
        }
      },

      error: (error) => {
        this.isSubmitting = false;

        if (error.error?.message) {
          this.globalMessage.error(error.error.message);
        } else {
          this.globalMessage.error('Unable to login. Please try again.');
        }
      },
    });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
