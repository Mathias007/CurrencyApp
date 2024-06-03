import { TestBed } from '@angular/core/testing';
import { CurrencyRatesComponent } from './currency-rates.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from '../currency.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('CurrencyRatesComponent', () => {
  let component: CurrencyRatesComponent;
  let fixture: any;
  let httpTestingController: HttpTestingController;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        CommonModule, 
        CurrencyRatesComponent
      ],
      providers: [CurrencyService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CurrencyRatesComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService); 
  });


  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download currency rates', () => {
    spyOn(currencyService, 'downloadCurrencyRates').and.returnValue(of({}));

    component.downloadCurrencyRates();
    expect(currencyService.downloadCurrencyRates).toHaveBeenCalled();
  });

  it('should fetch currency rates by period', () => {
    const mockRates = [
      { period: '2023-01-01', code: 'USD', avg_value: 3.8 },
      { period: '2023-02-01', code: 'USD', avg_value: 3.9 }
    ];
    spyOn(currencyService, 'getRatesByPeriod').and.returnValue(of(mockRates));

    component.fetchCurrencyRatesByPeriod('month');
    expect(currencyService.getRatesByPeriod).toHaveBeenCalledWith('month');
    expect(component.currencyRates).toEqual(component.transformRates(mockRates, 'month'));
  });

  it('should fetch all currency rates', () => {
    const mockRates = [
      { period: '2023-01-01', code: 'USD', avg_value: 3.8 },
      { period: '2023-02-01', code: 'USD', avg_value: 3.9 }
    ];
    spyOn(currencyService, 'getAllRates').and.returnValue(of(mockRates));

    component.fetchAllCurrencyRates();
    expect(currencyService.getAllRates).toHaveBeenCalled();
    expect(component.currencyRates).toEqual(component.transformRates(mockRates, 'general'));
  });

  it('should transform rates correctly', () => {
    const rates = [
      { period: '2023-03-15', code: 'USD', avg_value: 4.2 },
      { period: '2023-01-10', code: 'EUR', avg_value: 4.6 }
    ];
    const transformed = component.transformRates(rates, 'year');
    expect(transformed[0].transformedPeriod).toEqual('2023');
    expect(transformed[1].transformedPeriod).toEqual('');
  });
});
