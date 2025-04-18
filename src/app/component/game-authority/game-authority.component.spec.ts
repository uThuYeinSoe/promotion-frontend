import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAuthorityComponent } from './game-authority.component';

describe('GameAuthorityComponent', () => {
  let component: GameAuthorityComponent;
  let fixture: ComponentFixture<GameAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameAuthorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
