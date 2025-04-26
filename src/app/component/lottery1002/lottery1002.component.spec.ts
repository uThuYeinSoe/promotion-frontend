import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lottery1002Component } from './lottery1002.component';

describe('Lottery1002Component', () => {
  let component: Lottery1002Component;
  let fixture: ComponentFixture<Lottery1002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lottery1002Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lottery1002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
