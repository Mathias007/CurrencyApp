import { Routes } from '@angular/router';
import { CurrencyComponent } from './currency-rates/currency-rates.component';
// import { CurrencyRatesComponent } from './currency-rates/currency-rates.component';

export const routes: Routes = [
    // { path: 'currency', component: CurrencyRatesComponent }
    { path: 'currency', component: CurrencyComponent }
];
