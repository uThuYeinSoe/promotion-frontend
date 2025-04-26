import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldlotteryComponent } from './goldlottery.component';

describe('GoldlotteryComponent', () => {
  let component: GoldlotteryComponent;
  let fixture: ComponentFixture<GoldlotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldlotteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldlotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
