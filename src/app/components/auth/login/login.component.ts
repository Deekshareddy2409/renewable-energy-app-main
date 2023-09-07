import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  eyeOpen = faEye;
  eyeClosed = faEyeSlash;
  showPassword = false;
  loginError: string = '';
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  authenticateLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.loginUser({ email, password }).subscribe(
      (obj) => {
        localStorage.setItem('user', JSON.stringify(obj));
        this.loginSuccess = true;
        this.loginError = '';
        setTimeout(() => {
          this.route.navigate(['/']);
          this.authService.isLoggedInSubject.next(obj);
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        this.loginError = error.error.message;
      }
    );
  }

  dismissAlert() {
    this.loginError = '';
    this.loginSuccess = false;
  }
}
