import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAuthorityCreateComponent } from './game-authority-create.component';

describe('GameAuthorityCreateComponent', () => {
  let component: GameAuthorityCreateComponent;
  let fixture: ComponentFixture<GameAuthorityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameAuthorityCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAuthorityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
