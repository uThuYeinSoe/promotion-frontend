import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckycardComponent } from './luckycard.component';

describe('LuckycardComponent', () => {
  let component: LuckycardComponent;
  let fixture: ComponentFixture<LuckycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuckycardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuckycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
