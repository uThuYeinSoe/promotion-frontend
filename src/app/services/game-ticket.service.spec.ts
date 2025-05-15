import { TestBed } from '@angular/core/testing';

import { GameTicketService } from './game-ticket.service';

describe('GameTicketService', () => {
  let service: GameTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
