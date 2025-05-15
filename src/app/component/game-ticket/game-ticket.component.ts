import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDataService } from '../../services/user-data.service';
import { GameService } from '../../services/game.service';
import { GameItemService } from '../../services/game-item.service';
import { RewardService } from '../../services/reward.service';
import { GameTicketService } from '../../services/game-ticket.service';

import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { TableComponent } from '../table/table.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { firstValueFrom } from 'rxjs';

import { TicketCreate } from '../../models/ticket-create.model';

@Component({
  selector: 'app-game-ticket',
  imports: [
    CommonModule,
    CustomSelectComponent,
    CustomInputComponent,
    TableComponent,
    CustomPopupComponent,
  ],
  templateUrl: './game-ticket.component.html',
  styleUrl: './game-ticket.component.scss',
})
export class GameTicketComponent implements OnInit {
  userRole = '';
  showCreateGameTicketPopup = false;

  rawGameList: any[] = [];
  gameStatusList: { label: ''; value: any }[] = [];
  selectedGame: any = null;
  selectedGameCode: any = null;

  rawGameItemList: any[] = [];
  gameItemStatusList: { label: ''; value: '' }[] = [];
  selectedGameItemId: any = null;
  selectedGameItem: any = null;

  rewardType = 'text';
  rewardValue = '';

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

  rewardStatus = true;

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item Name',
    'Reward',
    'Reward Status',
    'Ticket Number',
    'Ticket Status',
    'Remark',
    'Ticket Status Change',
  ];

  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameItem',
    'rewardValue',
    'rewardStatus',
    'ticketNumber',
    'ticketStatus',
    'remark',
    'action',
  ];

  data = [];

  //Create Ticket

  selectedGameCodeForCreate = '';
  selectedGameItemIdForCreate: any = null;
  ticketAmtType = 'text';
  ticketAmt = '';
  ticketAmtPlaceHolder = 'Please Enter Amount For Ticket';

  constructor(
    private userData: UserDataService,
    private gameService: GameService,
    private gameItemService: GameItemService,
    private rewardService: RewardService,
    private gameTicketService: GameTicketService
  ) {
    this.userData.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
    });
  }

  async ngOnInit() {
    try {
      await this.getGameTypeAll();
      await this.findingGameItemByGameId(this.rawGameList[0].id);
      const resObj = await firstValueFrom(
        this.gameTicketService.getGameTicketByAgent()
      );
      this.data = resObj.gameTicketResObjList;
    } catch (err) {}
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

      this.selectedGameCode = this.rawGameList[0].gameCode;
    } catch (err) {}
  }

  async findingGameItemByGameId(gameItemId: number) {
    try {
      if (gameItemId === 1 || gameItemId === 3) {
        const resObj = await firstValueFrom(
          this.gameItemService.getGameItemByGame(gameItemId)
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
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onGameStatusChanged(gameCode: any) {
    this.selectedGame = this.rawGameList.find(
      (game) => game.gameCode === gameCode
    );
    await this.findingGameItemByGameId(this.selectedGame.id);
  }

  async onGameStatusChangedForCreate(gameCode: any) {
    this.selectedGame = this.rawGameList.find(
      (game) => game.gameCode === gameCode
    );
    await this.findingGameItemByGameId(this.selectedGame.id);
  }

  async onGameItemStatusChanged(value: any) {
    try {
      this.selectedGameItemId = value;
      const rewardObj = await firstValueFrom(
        this.rewardService.getRewardByGameItem(value)
      );
      this.rewardValue = rewardObj.rewardResobjList[0].rewardValue;
      this.rewardStatus = rewardObj.rewardResobjList[0].rewardStatus;
    } catch (err) {}
  }

  async onGameItemStatusChangedForCreate(value: any) {
    try {
      this.selectedGameItemIdForCreate = value;
      const rewardObj = await firstValueFrom(
        this.rewardService.getRewardByGameItem(value)
      );
      this.rewardValue = rewardObj.rewardResobjList[0].rewardValue;
      this.rewardStatus = rewardObj.rewardResobjList[0].rewardStatus;
    } catch (err) {}
  }

  onFindTicketByParameter() {}

  onOpenCreateGameTicketPopUp() {
    this.showCreateGameTicketPopup = true;
  }

  changeReward(value: any) {}

  onShowAllTicketByReward(value: any) {}

  // ticketCreatePayload: TicketCreate = {
  //   gameId: 0,
  //   gameItemId: 0,
  //   rewardId: 0,
  //   ticketAmt: 0,
  // };
  onTicketCreate() {
    // this.ticketCreatePayload.gameId = this.selectedGame.id;
    // this.ticketCreatePayload.gameItemId = this.selectedGameItemIdForCreate;
    // // this.ticketCreatePayload.rewardId = this.reward;
    // this.ticketCreatePayload.ticketAmt = 1;
  }

  onCancel() {}
}
