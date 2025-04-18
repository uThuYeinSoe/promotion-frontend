import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { MainSideComponent } from './component/main-side/main-side.component';
import { HomeComponent } from './component/home/home.component';
import { TicketCreateHistoryComponent } from './component/ticket-create-history/ticket-create-history.component';
import { TicketTransactionHistoryComponent } from './component/ticket-transaction-history/ticket-transaction-history.component';
import { GameComponent } from './component/game/game.component';
import { RewardComponent } from './component/reward/reward.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
  },
];
