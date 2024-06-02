// import { Component, OnInit } from '@angular/core';
// import { CurrencyService } from '../currency.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-currency-rates',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './currency-rates.component.html',
//   styleUrls: ['./currency-rates.component.scss']
// })
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

@Component({
  selector: 'app-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.scss']
})
export class CurrencyComponent {
  constructor(private http: HttpClient) {}

  fetchCurrencyRates() {
    this.http.post('http://localhost:8000/download-currency-rates/', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
