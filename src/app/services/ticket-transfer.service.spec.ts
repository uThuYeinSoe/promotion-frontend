import { TestBed } from '@angular/core/testing';

import { TicketTransferService } from './ticket-transfer.service';

describe('TicketTransferService', () => {
  let service: TicketTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
