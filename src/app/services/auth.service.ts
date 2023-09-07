import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<User>({});
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>('url/api/auth/register', user);
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>('url/api/auth/login', user);
  }
}
