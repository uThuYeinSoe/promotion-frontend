import { TestBed } from '@angular/core/testing';

import { AgentCreateService } from './agent-create.service';

describe('AgentCreateService', () => {
  let service: AgentCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
