import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTicketComponent } from './game-ticket.component';

describe('GameTicketComponent', () => {
  let component: GameTicketComponent;
  let fixture: ComponentFixture<GameTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
