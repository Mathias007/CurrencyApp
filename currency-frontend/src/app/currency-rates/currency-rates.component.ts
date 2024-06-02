import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.css']
})
export class CurrencyRatesComponent implements OnInit {
  rates: any;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getRates().subscribe((data: any) => {
      this.rates = data;
    });
  }
}
