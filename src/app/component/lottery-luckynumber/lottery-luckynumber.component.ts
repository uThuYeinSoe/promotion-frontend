import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from '../table/table.component';
import { UserDataService } from '../../services/user-data.service';
import { GameService } from '../../services/game.service';
import { AgentLotteryControlService } from '../../services/agent-lottery-control.service';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { LotteryReward } from '../../models/lottery-reward.model';

import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-lottery-luckynumber',
  imports: [
    CommonModule,
    TableComponent,
    CustomPopupComponent,
    CustomInputComponent,
    CustomSelectComponent,
  ],
  templateUrl: './lottery-luckynumber.component.html',
  styleUrl: './lottery-luckynumber.component.scss',
  standalone: true,
})
export class LotteryLuckynumberComponent implements OnInit {
  userRole: string = '';
  showPopup: boolean = false;

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Status',
    'Agent Status',
    'reward',
    'Reward Status',
    'Action',
  ];
  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameStatus',
    'agentControlStatus',
    'reward',
    'rewardStatus',
    'action',
  ];
  data: any[] = [];

  gameNameType = 'text';
  rewardType = 'text';
  gameNameVal = '';
  rewardVal = '';
  rewardPlaceHolder = 'Please Enter Reward Value';

  booleanStatus: { label: string; value: boolean }[] = [
    {
      label: 'True',
      value: true,
    },
    {
      label: 'False',
      value: false,
    },
  ];

  constructor(
    private userDataService: UserDataService,
    private gameService: GameService,
    private agentLotteryControlService: AgentLotteryControlService
  ) {
    this.userDataService.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
    });
  }

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
      let lotteryControlObj = await firstValueFrom(
        this.agentLotteryControlService.getAgentLotteryControl()
      );
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

        const resObj = await firstValueFrom(
          this.agentLotteryControlService.getLotteryReward()
        );

        if (resObj.lotteryRewardObjList.length > 0) {
          const rewardMap = new Map(
            resObj.lotteryRewardObjList.map((item: any) => [
              item.gameCode,
              item,
            ])
          );

          this.data = this.data.map((game: any) => {
            const rewardInfo = rewardMap.get(game.gameCode) as
              | {
                  reward: string;
                  rewardStatus: string;
                }
              | undefined;
            return {
              ...game,
              reward: rewardInfo?.reward ?? 'မသတ်မှတ်ရသေး',
              rewardStatus: rewardInfo?.rewardStatus ?? 'မသတ်မှတ်ရသေး',
            };
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  onUpdateGame(data: any) {
    this.showPopup = true;
    this.gameNameVal = data.gameName;
    this.rewardVal = data.reward;
    this.lotteryRewardPayload.gameCode = data.gameCode;
    this.lotteryRewardPayload.rewardStatus =
      typeof data.rewardStatus === 'boolean' ? data.rewardStatus : false;
  }

  lotteryRewardPayload: LotteryReward = {
    gameCode: '',
    reward: '',
    rewardStatus: true,
  };

  async rewardCreate() {
    console.log(this.lotteryRewardPayload);
    this.lotteryRewardPayload.reward = this.rewardVal;
    const resObj = await firstValueFrom(
      this.agentLotteryControlService.saveLotteryReward(
        this.lotteryRewardPayload
      )
    );
    console.log(resObj);
    if (resObj.status) {
      await this.agentLotteryControlFunction();
      this.onCancel();
    }
  }

  onRewardStatusChanged(data: any) {
    this.lotteryRewardPayload.rewardStatus = data;
  }

  onCancel() {
    this.showPopup = false;
    this.rewardVal = '';
    this.lotteryRewardPayload = {
      gameCode: '',
      reward: '',
      rewardStatus: true,
    };
  }
}
