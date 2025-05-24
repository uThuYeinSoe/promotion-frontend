import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryRewardComponent } from './lottery-reward.component';

describe('LotteryRewardComponent', () => {
  let component: LotteryRewardComponent;
  let fixture: ComponentFixture<LotteryRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryRewardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
