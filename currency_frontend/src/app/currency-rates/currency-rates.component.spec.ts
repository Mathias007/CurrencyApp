// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CurrencyRatesComponent } from './currency-rates.component';

// describe('CurrencyRatesComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ CurrencyRatesComponent ],
//       imports: [ HttpClientTestingModule ]
//     }).compileComponents();
//   });

//   it('should create', () => {
//     const fixture = TestBed.createComponent(CurrencyRatesComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { CurrencyComponent } from './currency-rates.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CurrencyComponent],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch rates on button click', () => {
    const fixture = TestBed.createComponent(CurrencyComponent);
    const app = fixture.componentInstance;
    app.fetchCurrencyRates();
    
    const req = httpTestingController.expectOne('http://localhost:8000/download-currency-rates/');
    expect(req.request.method).toEqual('POST');
    req.flush({});

    httpTestingController.verify();
  });
});
