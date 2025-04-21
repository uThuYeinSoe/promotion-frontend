import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';
import { LeftSideComponent } from '../../component/left-side/left-side.component';
import { RightSideComponent } from '../../component/right-side/right-side.component';
import { SpinWheelGameComponent } from '../../component/spin-wheel-game/spin-wheel-game.component';

@Component({
  selector: 'app-spin-wheel',
  imports: [
    CommonModule,
    NavBarComponent,
    LeftSideComponent,
    RightSideComponent,
    SpinWheelGameComponent,
  ],
  templateUrl: './spin-wheel.component.html',
  styleUrl: './spin-wheel.component.scss',
})
export class SpinWheelComponent {}
