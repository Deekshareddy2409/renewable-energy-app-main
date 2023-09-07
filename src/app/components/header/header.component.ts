import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: User = {};
  private isLoggedInSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }
    );
  }

  routeToPage(value: string) {
    if (value === 'login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
      this.authService.isLoggedInSubject.next({});
    }
  }

  ngOnDestroy() {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }
}
