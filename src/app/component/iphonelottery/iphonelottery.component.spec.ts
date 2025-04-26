import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphonelotteryComponent } from './iphonelottery.component';

describe('IphonelotteryComponent', () => {
  let component: IphonelotteryComponent;
  let fixture: ComponentFixture<IphonelotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IphonelotteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IphonelotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
