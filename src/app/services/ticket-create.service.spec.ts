import { TestBed } from '@angular/core/testing';

import { TicketCreateService } from './ticket-create.service';

describe('TicketCreateService', () => {
  let service: TicketCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
