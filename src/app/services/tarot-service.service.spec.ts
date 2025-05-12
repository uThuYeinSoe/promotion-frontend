import { TestBed } from '@angular/core/testing';

import { TarotServiceService } from './tarot-service.service';

describe('TarotServiceService', () => {
  let service: TarotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
