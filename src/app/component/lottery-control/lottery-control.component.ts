import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from '../table/table.component';

import { GameService } from '../../services/game.service';
import { AgentLotteryControlService } from '../../services/agent-lottery-control.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lottery-control',
  imports: [CommonModule, TableComponent],
  templateUrl: './lottery-control.component.html',
  styleUrl: './lottery-control.component.scss',
  standalone: true,
})
export class LotteryControlComponent {
  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Status',
    'Agent Control Status',
    'Change Status',
  ];
  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameStatus',
    'agentControlStatus',
    'action',
  ];
  data: any[] = [];

  constructor(
    private gameService: GameService,
    private agentLotteryControlService: AgentLotteryControlService
  ) {}

  async ngOnInit() {
    await this.agentLotteryControlFunction();
  }

  async agentLotteryControlFunction() {
    try {
      const excludedCodes = ['0100', '0200', '0300'];
      let resObj = await firstValueFrom(this.gameService.getGameAll());
      this.data = resObj.gameList.filter(
        (game: any) => !excludedCodes.includes(game.gameCode)
      );
      console.log(this.data);
      let lotteryControlObj = await firstValueFrom(
        this.agentLotteryControlService.getAgentLotteryControl()
      );
      console.log(lotteryControlObj);
      if (lotteryControlObj.lotteryControlObjs === null) {
        this.data = this.data.map((game: any) => {
          return {
            ...game,
            agentControlStatus: false,
          };
        });
      } else {
        const controlMap = new Map(
          lotteryControlObj.lotteryControlObjs.map((item: any) => [
            item.gameCode,
            item.agentControlStatus,
          ])
        );

        this.data = this.data.map((game: any) => ({
          ...game,
          agentControlStatus: controlMap.has(game.gameCode)
            ? controlMap.get(game.gameCode)
            : false,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  updatePayload = {
    gameCode: '',
  };

  async onUpdateGame(game: any) {
    this.updatePayload.gameCode = game.gameCode;
    try {
      const resObj = await firstValueFrom(
        this.agentLotteryControlService.changeStatusLotteryControlByLottery(
          this.updatePayload
        )
      );
      console.log(resObj);
      if (resObj.status) {
        await this.agentLotteryControlFunction();
      }
    } catch (err) {
      console.log(err);
    }
  }
}
