import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getMarketChart(coin: string, days: number): Observable<any> {
    const key = `chart-${coin}-${days}`;

    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    return this.http
      .get(`${this.apiUrl}/market-chart/?coin=${coin}&days=${days}`)
      .pipe(tap(data => this.cache.set(key, data)));
  }

  // ✅ ADD THESE
  getTopGainer(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-gainer/`);
  }

  getTopLoser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-loser/`);
  }
}
