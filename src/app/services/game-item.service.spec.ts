import { TestBed } from '@angular/core/testing';

import { GameItemService } from './game-item.service';

describe('GameItemService', () => {
  let service: GameItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
