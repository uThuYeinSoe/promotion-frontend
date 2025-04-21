import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinWheelGameComponent } from './spin-wheel-game.component';

describe('SpinWheelGameComponent', () => {
  let component: SpinWheelGameComponent;
  let fixture: ComponentFixture<SpinWheelGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinWheelGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinWheelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
