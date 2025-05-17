import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TableComponent } from '../table/table.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';

import { CreateReward } from '../../models/create-reward.model';

import { UserDataService } from '../../services/user-data.service';
import { GameService } from '../../services/game.service';
import { GameItemService } from '../../services/game-item.service';
import { RewardService } from '../../services/reward.service';
import { GameTicketService } from '../../services/game-ticket.service';
import { firstValueFrom } from 'rxjs';

import { TicketCreate } from '../../models/ticket-create.model';
import { LuckyCardReward } from '../../models/lucky-card-reward.model';

@Component({
  selector: 'app-reward',
  imports: [
    CommonModule,
    TableComponent,
    CustomPopupComponent,
    CustomSelectComponent,
    CustomInputComponent,
  ],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss',
  standalone: true,
})
export class RewardComponent implements OnInit {
  userRole: string = '';

  showCreateRewardPopup = false;
  showEditRewardPopup = false;
  showCreateTicketPopup = false;

  rawGameList: any[] = [];
  gameStatusList: { label: ''; value: any }[] = [];
  selectedGame: any = null;
  selectedGameCode: any = null;

  rawGameItemList: any[] = [];
  gameItemStatusList: { label: ''; value: '' }[] = [];
  selectedGameItemId: any = null;

  rewardType = 'text';
  rewardHolder = 'Please Enter Reward Value';
  rewardValue = '';

  ticketAmtType = 'text';
  ticketAmt = '';
  ticketAmtPlaceHolder = 'Please Enter Amount Fot Ticket';

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item Name',
    'Reward',
    'Reward Status',
    'Edit',
    'Create Ticket',
  ];

  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameItemName',
    'rewardValue',
    'rewardStatus',
    'action',
    'action2',
  ];

  data: any[] = [];

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

  // Update Stattus
  selectedGameName = '';
  selectedGameItemName = '';
  rewardStatus: boolean = true;
  updateSelectGame: any = null;
  updateSelectGameItem: any = null;

  gameType = 'text';
  gameItemType = 'text';
  gameName = '';
  gameItemName = '';

  constructor(
    private userData: UserDataService,
    private gameService: GameService,
    private gameItemService: GameItemService,
    private gameTicketService: GameTicketService,
    private rewardService: RewardService
  ) {
    this.userData.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
    });
  }

  async ngOnInit() {
    try {
      const resObj = await firstValueFrom(this.rewardService.getRewardAll());

      const luckyCardResObj = await firstValueFrom(
        this.rewardService.getLuckyCardRewardAll()
      );

      console.log(this.data);

      this.data = [
        ...resObj.rewardResobjList,
        ...luckyCardResObj.luckyCardRewardObjs,
      ];

      await this.getGameTypeAll();

      this.selectedGame = this.rawGameList[0].gameCode;

      await this.findingGameItemByGameId(this.rawGameList[0].id);
    } catch (err) {
      console.log(err);
    }
  }

  async getGameTypeAll() {
    try {
      const resGameObj = await firstValueFrom(this.gameService.getGameAll());
      this.rawGameList = resGameObj.gameList;

      this.gameStatusList = this.rawGameList.map((game: any) => {
        return {
          label: game.gameName,
          value: game.gameCode,
        };
      });

      this.selectedGame = this.rawGameList[0].gameCode;
    } catch (err) {}
  }

  async findingGameItemByGameId(gameId: number) {
    console.log(gameId);
    try {
      if (gameId === 1 || gameId === 3) {
        const resObj = await firstValueFrom(
          this.gameItemService.getGameItemByGame(gameId)
        );
        this.rawGameItemList = this.gameItemStatusList = [];

        this.rawGameItemList = resObj.gameItemDtos;
        this.gameItemStatusList = this.rawGameItemList.map((gameItem: any) => {
          return {
            label: gameItem.gameItemName,
            value: gameItem.id,
          };
        });
        this.selectedGameItemId = this.rawGameItemList[0].id;
      } else if (gameId === 2) {
        const resObj = await firstValueFrom(
          this.gameItemService.getLuckyCardGameItem()
        );
        console.log(resObj);
        this.rawGameItemList = this.gameItemStatusList = [];

        this.rawGameItemList = resObj.tarotObjList;
        this.gameItemStatusList = this.rawGameItemList.map((gameItem: any) => {
          return {
            label: gameItem.name,
            value: gameItem.id,
          };
        });
        this.selectedGameItemId = this.rawGameItemList[0].id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  onOpenCreateRewardPopUp() {
    this.showCreateRewardPopup = true;
  }

  async changeReward(value: any) {
    try {
      this.updateSelectGame = this.rawGameList.filter(
        (game) => game.gameCode === value.gameCode
      )[0];
      this.selectedGameName = this.updateSelectGame.gameName;

      console.log(this.rawGameList);

      await this.findingGameItemByGameId(this.updateSelectGame.id);

      console.log(this.rawGameItemList);

      this.updateSelectGameItem = this.rawGameItemList.filter(
        (gameItem) => gameItem.gameItemName === value.gameItemName
      )[0];

      this.selectedGameItemName = this.updateSelectGameItem.gameItemName;

      this.rewardValue = value.rewardValue;
      this.rewardStatus = value.rewardStatus;

      this.showEditRewardPopup = true;
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  }

  async onCreateTicketForGame(value: any) {
    console.log(value);
    this.gameName = value.gameName;
    this.gameItemName = value.gameItemName;
    this.rewardValue = value.rewardValue;
    this.selectedGameCode = value.gameCode;
    this.showCreateTicketPopup = true;
  }

  craetTicketPayload: TicketCreate = {
    gameCode: '',
    gameItemName: '',
    ticketAmt: '',
  };

  async onCreateTicket() {
    this.craetTicketPayload.gameCode = this.selectedGameCode;
    this.craetTicketPayload.gameItemName = this.gameItemName;
    this.craetTicketPayload.ticketAmt = this.ticketAmt;

    const resObj = await firstValueFrom(
      this.gameTicketService.createTicket(this.craetTicketPayload)
    );

    console.log(resObj);
    if (resObj.status) {
      await this.onCancel();
    }
  }

  async onGameStatusChanged(gameCode: any) {
    console.log(gameCode);
    const tempGameObj = this.rawGameList.filter(
      (game) => game.gameCode === gameCode
    )[0];
    this.selectedGame = tempGameObj.gameCode;
    console.log(this.selectedGame);
    await this.findingGameItemByGameId(tempGameObj?.id);
  }

  onGameItemStatusChanged(value: any) {
    this.selectedGameItemId = value;
  }

  onRewardItemStatusChanged(value: any) {
    this.rewardStatus = value;
  }

  saveRewardPayload: CreateReward = {
    gameCode: '',
    gameItemId: 0,
    rewardValue: '',
  };

  saveRewardLuckyCardPayload: LuckyCardReward = {
    luckyCardId: 0,
    value: '',
  };

  async onRewardSave() {
    console.log(this.selectedGameItemId);
    this.saveRewardPayload.gameCode = this.rawGameList.filter(
      (game) => game.gameCode === this.selectedGame
    )[0].gameCode;
    this.saveRewardPayload.gameItemId = this.selectedGameItemId;
    this.saveRewardPayload.rewardValue = this.rewardValue;
    if (!this.saveRewardPayload.rewardValue) {
      console.log('Please Enter Reward Value');
      return;
    }
    console.log(this.saveRewardPayload);
    try {
      if (
        this.saveRewardPayload.gameCode === '0100' ||
        this.saveRewardPayload.gameCode === '0300'
      ) {
        const resObj = await firstValueFrom(
          this.rewardService.saveReward(this.saveRewardPayload)
        );
        if (resObj.status) {
          const resObj = await firstValueFrom(
            this.rewardService.getRewardAll()
          );
          const luckyCardResObj = await firstValueFrom(
            this.rewardService.getLuckyCardRewardAll()
          );
          this.data = [
            ...resObj.rewardResobjList,
            ...luckyCardResObj.luckyCardRewardObjs,
          ];
          await this.onCancel();
        }
      } else if (this.saveRewardPayload.gameCode === '0200') {
        this.saveRewardLuckyCardPayload.luckyCardId = Number(
          this.saveRewardPayload.gameItemId
        );
        this.saveRewardLuckyCardPayload.value =
          this.saveRewardPayload.rewardValue;

        const resObj = await firstValueFrom(
          this.rewardService.saveLuckyCardReward(
            this.saveRewardLuckyCardPayload
          )
        );
        console.log(resObj);
        if (resObj.status) {
          const resObj = await firstValueFrom(
            this.rewardService.getRewardAll()
          );
          const luckyCardResObj = await firstValueFrom(
            this.rewardService.getLuckyCardRewardAll()
          );
          this.data = [
            ...resObj.rewardResobjList,
            ...luckyCardResObj.luckyCardRewardObjs,
          ];
          await this.onCancel();
        }
      }
    } catch (err) {}
    console.log(this.saveRewardPayload);
  }

  rewardUpdatePayload = {
    gameCode: '',
    gameItemId: 0,
    status: true,
    rewardValue: '',
  };

  async onRewardUpdate() {
    this.rewardUpdatePayload.gameCode = this.updateSelectGame.gameCode;
    this.rewardUpdatePayload.gameItemId = this.updateSelectGameItem.id;
    this.rewardUpdatePayload.status = this.rewardStatus;
    this.rewardUpdatePayload.rewardValue = this.rewardValue;
    console.log(this.rewardUpdatePayload);

    try {
      const resObj = await firstValueFrom(
        this.rewardService.updateReward(this.rewardUpdatePayload)
      );
      console.log(resObj);
      if (resObj.status) {
        const resObj = await firstValueFrom(this.rewardService.getRewardAll());
        this.data = resObj.rewardResobjList;
        this.onCancel();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onCancel() {
    this.showCreateRewardPopup = false;
    this.showCreateTicketPopup = false;
    this.showCreateTicketPopup = false;
    this.showEditRewardPopup = false;
    this.selectedGame = null;
    this.selectedGameItemId = null;
    this.rewardValue = '';
    this.ticketAmt = '';

    this.selectedGameName = '';
    this.selectedGameItemName = '';
    this.rewardStatus = true;

    this.saveRewardPayload = {
      gameCode: '',
      gameItemId: 0,
      rewardValue: '',
    };

    this.rewardUpdatePayload = {
      gameCode: '',
      gameItemId: 0,
      status: true,
      rewardValue: '',
    };

    await this.getGameTypeAll();
    await this.findingGameItemByGameId(this.rawGameList[0].id);
  }
}
