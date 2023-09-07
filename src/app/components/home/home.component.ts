import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedInUser;
  private isLoggedInSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser: User | boolean) => {
        this.loggedInUser = loggedInUser;
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }
}
