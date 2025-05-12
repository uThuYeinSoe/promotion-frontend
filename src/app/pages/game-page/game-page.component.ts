import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';
import { LeftSideComponent } from '../../component/left-side/left-side.component';
import { RightSideComponent } from '../../component/right-side/right-side.component';
import { ActivatedRoute } from '@angular/router';

import { SpinWheelGameComponent } from '../../component/spin-wheel-game/spin-wheel-game.component';
import { DiceComponent } from '../../component/dice/dice.component';
import { LuckycardComponent } from '../../component/luckycard/luckycard.component';

@Component({
  selector: 'app-game-page',
  imports: [
    CommonModule,
    NavBarComponent,
    LeftSideComponent,
    RightSideComponent,
    SpinWheelGameComponent,
    DiceComponent,
    LuckycardComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  standalone: true,
})
export class GamePageComponent {
  pathName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pathName = this.route.routeConfig?.path || '';
    console.log(this.pathName);
  }
}
