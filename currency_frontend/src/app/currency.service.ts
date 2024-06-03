import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  downloadCurrencyRates(): Observable<any> {
    return this.http.post(`${this.baseUrl}/download-currency-rates/`, {});
  }

  getRatesByPeriod(period: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/fetch-currency-rates-period/${period}/`);
  }

  getAllRates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fetch-currency-rates-general/`);
  }
}
