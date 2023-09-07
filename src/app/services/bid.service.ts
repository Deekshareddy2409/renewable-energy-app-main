import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from '../models/Bid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  constructor(private http: HttpClient) {}

  createBid(bid: Bid): Observable<any> {
    return this.http.post<any>('url/api/bid/createBid', bid);
  }

  getBidsForSeller(email: string): Observable<Bid[]> {
    return this.http.get<Bid[]>(`url/api/bid/bids/${email}`);
  }

  changeBidState(bidId: number, newState: string) {
    return this.http.post<Bid[]>(`url/api/bid/changeState/${bidId}`, {
      newState: newState,
    });
  }
}
