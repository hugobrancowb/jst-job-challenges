import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { DataserviceService } from './dataservice.service';

describe('DataserviceService', () => {
  let service: DataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(DataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full name of currency', () => {
    const response = service.get_name('BRL');
    expect(response).toBe('Brazilian Real');
  });
});
