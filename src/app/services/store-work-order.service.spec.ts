import { TestBed } from '@angular/core/testing';

import { StoreWorkOrderService } from './store-work-order.service';

describe('StoreWorkOrderService', () => {
  let service: StoreWorkOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreWorkOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
