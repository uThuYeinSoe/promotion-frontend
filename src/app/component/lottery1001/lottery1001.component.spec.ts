import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lottery1001Component } from './lottery1001.component';

describe('Lottery1001Component', () => {
  let component: Lottery1001Component;
  let fixture: ComponentFixture<Lottery1001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lottery1001Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lottery1001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
