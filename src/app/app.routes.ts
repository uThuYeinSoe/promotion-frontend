import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { DiceComponent } from './component/dice/dice.component';
import { LuckycardComponent } from './component/luckycard/luckycard.component';
import { GoldlotteryComponent } from './component/goldlottery/goldlottery.component';
import { IphonelotteryComponent } from './component/iphonelottery/iphonelottery.component';
import { Lottery1001Component } from './component/lottery1001/lottery1001.component';
import { Lottery1002Component } from './component/lottery1002/lottery1002.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'spin-wheel', component: GamePageComponent },
  { path: 'lucky-card', component: GamePageComponent },
  { path: 'dice', component: GamePageComponent },
  { path: 'gold-lottery', component: GamePageComponent },
  { path: 'iphone-lottery', component: GamePageComponent },
  { path: '100l-lottery1', component: GamePageComponent },
  { path: '100l-lottery2', component: GamePageComponent },
];
