import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SpinWheelComponent } from './pages/spin-wheel/spin-wheel.component';
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
  { path: 'spinWheel', component: SpinWheelComponent },
  { path: 'luckycard', component: LuckycardComponent },
  { path: 'dice', component: DiceComponent },
  { path: 'goldLottery', component: GoldlotteryComponent },
  { path: 'iphoneLottery', component: IphonelotteryComponent },
  { path: '100lLottery1', component: Lottery1001Component },
  { path: '100lLottery2', component: Lottery1002Component },
];
