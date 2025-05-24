import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavChangeService } from '../../services/nav-change.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { TicketCreateHistoryComponent } from '../ticket-create-history/ticket-create-history.component';
import { TicketTransactionHistoryComponent } from '../ticket-transaction-history/ticket-transaction-history.component';
import { GameComponent } from '../game/game.component';
import { RewardComponent } from '../reward/reward.component';
import { LogoutComponent } from '../logout/logout.component';
import { AgentComponent } from '../agent/agent.component';
import { GameAuthorityComponent } from '../game-authority/game-authority.component';
import { GameItemComponent } from '../game-item/game-item.component';
import { GameTicketComponent } from '../game-ticket/game-ticket.component';
import { LotteryControlComponent } from '../lottery-control/lottery-control.component';
import { LotteryLuckynumberComponent } from '../lottery-luckynumber/lottery-luckynumber.component';
import { LotteryRewardComponent } from '../lottery-reward/lottery-reward.component';

@Component({
  selector: 'app-main-side',
  imports: [
    HomeComponent,
    CommonModule,
    TicketCreateHistoryComponent,
    TicketTransactionHistoryComponent,
    GameComponent,
    RewardComponent,
    LogoutComponent,
    AgentComponent,
    GameAuthorityComponent,
    GameItemComponent,
    GameTicketComponent,
    LotteryControlComponent,
    LotteryLuckynumberComponent,
    LotteryRewardComponent,
  ],
  templateUrl: './main-side.component.html',
  styleUrl: './main-side.component.scss',
  standalone: true,
})
export class MainSideComponent implements OnInit, OnDestroy {
  navCode = '01000';

  private sub!: Subscription;

  constructor(private navChangeService: NavChangeService) {}

  ngOnInit(): void {
    this.sub = this.navChangeService.navCode$.subscribe((code) => {
      this.navCode = code;
      console.log('MainSide received navCode:', code);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
