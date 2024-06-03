import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download currency rates', () => {
    service.downloadCurrencyRates().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8000/download-currency-rates/');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get rates by period', () => {
    const period = 'year';
    service.getRatesByPeriod(period).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:8000/fetch-currency-rates-period/${period}/`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get all rates', () => {
    service.getAllRates().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8000/fetch-currency-rates-general/');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
