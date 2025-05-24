import { TestBed } from '@angular/core/testing';

import { AgentLotteryControlService } from './agent-lottery-control.service';

describe('AgentLotteryControlService', () => {
  let service: AgentLotteryControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentLotteryControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
