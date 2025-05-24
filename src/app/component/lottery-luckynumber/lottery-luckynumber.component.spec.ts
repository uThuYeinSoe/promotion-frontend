import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryLuckynumberComponent } from './lottery-luckynumber.component';

describe('LotteryLuckynumberComponent', () => {
  let component: LotteryLuckynumberComponent;
  let fixture: ComponentFixture<LotteryLuckynumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryLuckynumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryLuckynumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
