import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreateHistoryComponent } from './ticket-create-history.component';

describe('TicketCreateHistoryComponent', () => {
  let component: TicketCreateHistoryComponent;
  let fixture: ComponentFixture<TicketCreateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCreateHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCreateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
