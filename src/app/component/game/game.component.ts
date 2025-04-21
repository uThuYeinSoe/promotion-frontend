import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-game',
  imports: [
    CommonModule,
    TableComponent,
    CustomPopupComponent,
    CustomInputComponent,
    CustomSelectComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  standalone: true,
})
export class GameComponent implements OnInit {
  showPopup = false;
  updatePopUp = false;
  disabledStatus = true;
  userRole = '';

  gameCodeType = 'text';
  gameNameType = 'text';
  conversionRateType = 'text';

  gameCodeTypeName = 'Please Enter Game Code';
  gameNameTypeName = 'Please Enter Game Name';
  conversionRateName = 'Please Enter Game Conversion';

  gameCodeVal = '';
  gameNameVal = '';
  conversionRateVal = '';

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Status',
    'Conversion Rate',
    'Edit',
  ];
  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameStatus',
    'conversationRate',
    'action',
  ];
  data = [];

  agentColumn = [
    'No',
    'Game Code',
    'Game Name',
    'Game Status',
    'Conversion Rate',
  ];
  agentDataKey: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameStatus',
    'conversationRate',
  ];
  agentData = [];

  gameStatusList = [
    { label: 'True', value: true },
    { label: 'False', value: false },
  ];

  selectedGameStatusList = null;

  gameIdType = 'text';
  gameIdVal = '';

  constructor(
    private gameService: GameService,
    private userData: UserDataService
  ) {
    this.userData.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
      console.log(this.userRole);
    });
  }

  async ngOnInit() {
    try {
      let resObj = await this.gameService.getGameAll().toPromise();
      this.data = resObj.gameList;
      this.agentData = resObj.gameList;
      console.log(resObj);
    } catch (err) {
      console.log(err);
    }
  }

  onConfirm() {
    this.showPopup = true;
    console.log('Confirmed!');
  }

  gamePayload: Game = {
    gameCode: '',
    gameName: '',
    gameStatus: true,
    conversationRate: 0,
  };

  async gameCreate() {
    try {
      this.gamePayload.gameCode = this.gameCodeVal;
      this.gamePayload.gameName = this.gameNameVal;
      this.gamePayload.conversationRate = Number(this.conversionRateVal);

      let resObj = await this.gameService
        .gameCreate(this.gamePayload)
        .toPromise();
      console.log(resObj);
      if (resObj.status) {
        let resObj = await this.gameService.getGameAll().toPromise();
        this.data = resObj.gameList;
        this.onCancel();
      }
    } catch (err) {}
  }

  gameUpdatePayload = {
    id: 0,
    gameCode: '',
    gameName: '',
    gameStatus: true,
    conversationRate: 0,
  };

  async gameUpdate() {
    try {
      this.gameUpdatePayload.id = Number(this.gameIdVal);
      this.gameUpdatePayload.gameCode = this.gameCodeVal;
      this.gameUpdatePayload.gameName = this.gameNameVal;
      this.gameUpdatePayload.gameStatus =
        this.selectedGameStatusList === null
          ? true
          : this.selectedGameStatusList;
      this.gameUpdatePayload.conversationRate = Number(this.conversionRateVal);
      console.log(this.gameUpdatePayload);
      let resObj = await this.gameService
        .gameUpdate(this.gameUpdatePayload)
        .toPromise();

      console.log(resObj);

      if (resObj.status) {
        let resObj = await this.gameService.getGameAll().toPromise();
        this.data = resObj.gameList;
        this.onCancel();
      }
    } catch (err) {}
  }

  onUpdateGame(game: any) {
    this.updatePopUp = true;
    this.gameIdVal = game.id;
    this.gameNameVal = game.gameName;
    this.gameCodeVal = game.gameCode;
    this.conversionRateVal = game.conversationRate;
  }

  onCancel() {
    this.showPopup = false;
    this.updatePopUp = false;

    this.gamePayload = {
      gameCode: '',
      gameName: '',
      gameStatus: true,
      conversationRate: 0,
    };

    this.gameUpdatePayload = {
      id: 0,
      gameCode: '',
      gameName: '',
      gameStatus: true,
      conversationRate: 0,
    };

    this.gameCodeVal = '';
    this.gameNameVal = '';
    this.conversionRateVal = '';
  }
}
