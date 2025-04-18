import { TestBed } from '@angular/core/testing';

import { NavChangeService } from './nav-change.service';

describe('NavChangeService', () => {
  let service: NavChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
