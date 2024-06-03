import { TestBed } from '@angular/core/testing';
import { CurrencyRatesComponent } from './currency-rates.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CurrencyRatesComponent],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch rates on button click', () => {
    const fixture = TestBed.createComponent(CurrencyRatesComponent);
    const app = fixture.componentInstance;
    app.downloadCurrencyRates();
    
    const req = httpTestingController.expectOne('http://localhost:8000/download-currency-rates/');
    expect(req.request.method).toEqual('POST');
    req.flush({});

    httpTestingController.verify();
  });
});
