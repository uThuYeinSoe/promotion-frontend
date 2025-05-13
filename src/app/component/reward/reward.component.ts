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
import { firstValueFrom } from 'rxjs';

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

  rawGameList: any[] = [];
  gameStatusList: { label: ''; value: any }[] = [];
  selectedGame: any = null;

  rawGameItemList: any[] = [];
  gameItemStatusList: { label: ''; value: '' }[] = [];
  selectedGameItemId: any = null;

  rewardType = 'text';
  rewardHolder = 'Please Enter Reward Value';
  rewardValue = '';

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item Name',
    'Reward',
    'Reward Status',
    'Change Status',
    'Show Ticket',
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

  data = [];

  constructor(
    private userData: UserDataService,
    private gameService: GameService,
    private gameItemService: GameItemService,
    private rewardService: RewardService
  ) {
    this.userData.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
    });
  }

  async ngOnInit() {
    try {
      const resObj = await firstValueFrom(this.rewardService.getRewardAll());
      this.data = resObj.rewardResobjList;

      console.log(this.data);

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

  onOpenCreateRewardPopUp() {
    this.showCreateRewardPopup = true;
  }

  changeRewardStatus(value: any) {
    console.log(value);
  }

  onShowAllTicketByReward(value: any) {
    console.log(value);
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

  saveRewardPayload: CreateReward = {
    gameCode: '',
    gameItemId: 0,
    rewardValue: '',
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
    try {
      const resObj = await firstValueFrom(
        this.rewardService.saveReward(this.saveRewardPayload)
      );
      if (resObj.status) {
        await this.onCancel();
      }
      console.log(resObj);
    } catch (err) {}
    console.log(this.saveRewardPayload);
  }

  async onCancel() {
    this.showCreateRewardPopup = false;
    this.selectedGame = null;
    this.selectedGameItemId = null;
    this.rewardValue = '';
    await this.getGameTypeAll();
    await this.findingGameItemByGameId(this.rawGameList[0].id);
  }
}
