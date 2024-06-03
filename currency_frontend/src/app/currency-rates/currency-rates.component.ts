// import { Component, OnInit } from '@angular/core';

// export class CurrencyRatesComponent implements OnInit {
//   rates: any;

//   constructor(private currencyService: CurrencyService) { }

//   ngOnInit(): void {
//     this.currencyService.getRates().subscribe((data: any) => {
//       this.rates = data;
//     });
//   }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-rates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.scss']
})
export class CurrencyRatesComponent {
  currencyRates: any;
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  constructor(private http: HttpClient) {}

  downloadCurrencyRates() {
    this.http.post('http://localhost:8000/download-currency-rates/', {}).subscribe(
      (response) => {
        console.log('Fetching currency rates in progress...', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchCurrencyRatesByPeriod(period: string) {
    this.http.get(`http://localhost:8000/fetch-currency-rates-period/${period}/`).subscribe(data => {
      this.currencyRates = this.transformRates(data, period);
    });
  }

  transformRates(rates: any, period: string) {
    let previousPeriod = '';

    rates.sort((a: any, b: any) => new Date(b.period).getTime() - new Date(a.period).getTime());

    return rates.map((rate: any) => {
      let transformedPeriod = '';

      if (period === 'year') {
        transformedPeriod = new Date(rate.period).getFullYear().toString();
      } else if (period === 'quarter') {
        const date = new Date(rate.period);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        transformedPeriod = `Q${quarter} ${date.getFullYear()}`;
      } else if (period === 'month') {
        const date = new Date(rate.period);
        transformedPeriod = `${this.months[date.getMonth()]} ${date.getFullYear()}`;
      } else {
        transformedPeriod = rate.period;
      }

      if (transformedPeriod === previousPeriod) {
        transformedPeriod = '';
      } else {
        previousPeriod = transformedPeriod;
      }

      return {
        ...rate,
        transformedPeriod
      };
    });
  }
}
