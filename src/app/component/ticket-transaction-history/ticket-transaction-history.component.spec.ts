import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTransactionHistoryComponent } from './ticket-transaction-history.component';

describe('TicketTransactionHistoryComponent', () => {
  let component: TicketTransactionHistoryComponent;
  let fixture: ComponentFixture<TicketTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketTransactionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
