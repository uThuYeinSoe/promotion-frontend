import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryControlComponent } from './lottery-control.component';

describe('LotteryControlComponent', () => {
  let component: LotteryControlComponent;
  let fixture: ComponentFixture<LotteryControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
