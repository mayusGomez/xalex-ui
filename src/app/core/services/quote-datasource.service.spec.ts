import { TestBed } from '@angular/core/testing';

import { QuoteDatasourceService } from './quote-datasource.service';

describe('QuoteDatasourceService', () => {
  let service: QuoteDatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
