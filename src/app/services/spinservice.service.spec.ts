import { TestBed } from '@angular/core/testing';

import { SpinserviceService } from './spinservice.service';

describe('SpinserviceService', () => {
  let service: SpinserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
