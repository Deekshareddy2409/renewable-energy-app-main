import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressDetails } from '../models/AddressDetails';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  saveAddress(user: User): Observable<AddressDetails> {
    return this.http.post<AddressDetails>(`url/api/address/saveAddress`, user);
  }

  getAddressDetailsForUser(email: string): Observable<AddressDetails> {
    return this.http.get<AddressDetails>(`url/api/address/getAddress/${email}`);
  }
}
