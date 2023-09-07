import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeItem } from '../models/TradeItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradingService {
  constructor(private http: HttpClient) {}

  createContract(contractData: TradeItem): Observable<any> {
    return this.http.post<any>('url/api/contract/create', contractData);
  }

  getContracts(): Observable<TradeItem[]> {
    return this.http.get<TradeItem[]>('url/api/contract/get');
  }

  getContractsByPublisher(email: string): Observable<TradeItem[]> {
    return this.http.get<TradeItem[]>(
      `url/api/contract/getMyContracts/${email}`
    );
  }

  deleteContract(id: number): Observable<TradeItem[]> {
    return this.http.delete<TradeItem[]>(
      `url/api/contract/deleteContract/${id}`
    );
  }
}
