import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../component/nav-bar/nav-bar.component';
import { LeftSideComponent } from '../../component/left-side/left-side.component';
import { RightSideComponent } from '../../component/right-side/right-side.component';
import { ActivatedRoute } from '@angular/router';

import { SpinWheelGameComponent } from '../../component/spin-wheel-game/spin-wheel-game.component';
import { DiceComponent } from '../../component/dice/dice.component';
import { LuckycardComponent } from '../../component/luckycard/luckycard.component';
import { GoldlotteryComponent } from '../../component/goldlottery/goldlottery.component';
import { IphonelotteryComponent } from '../../component/iphonelottery/iphonelottery.component';
import { Lottery1001Component } from '../../component/lottery1001/lottery1001.component';
import { Lottery1002Component } from '../../component/lottery1002/lottery1002.component';

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
    GoldlotteryComponent,
    IphonelotteryComponent,
    Lottery1001Component,
    Lottery1002Component,
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
