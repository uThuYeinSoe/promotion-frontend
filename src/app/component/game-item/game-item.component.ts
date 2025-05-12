import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { UserDataService } from '../../services/user-data.service';
import { GameService } from '../../services/game.service';
import { GameItemService } from '../../services/game-item.service';
import { ShowTicketComponent } from '../show-ticket/show-ticket.component';
import { TicketCreateService } from '../../services/ticket-create.service';
import { TarotServiceService } from '../../services/tarot-service.service';

import { GameItem } from '../../models/game-item.model';
import { GamitemTicket } from '../../models/gamitem-ticket.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-game-item',
  imports: [
    CommonModule,
    TableComponent,
    CustomPopupComponent,
    CustomSelectComponent,
    CustomInputComponent,
    ShowTicketComponent,
  ],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss',
  standalone: true,
})
export class GameItemComponent implements OnInit {
  userRole = '';
  showPopup = false;
  gameTicketComponent = false;
  showCreateTicketPopUp = false;
  noNeedForGameItem = false;

  gameStatusList: { label: ''; value: '' }[] = [];
  gameItemList: { label: ''; value: '' }[] = [];
  gameRawArr: {
    id: number;
    gameCode: string;
    gameName: string;
    gameStatus: boolean;
    conversationRate: number;
  }[] = [];

  selectedGameStatusList: string | null | number | undefined = null;
  selectedGameItemStatus: string | null | number | undefined = null;

  gameSelectedObj = {
    id: 0,
    gameCode: '',
    gameName: '',
    gameStatus: true,
    conversationRate: 0,
  };

  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item',
    'Game Item Desc',
    'Game Item Status',
    'Show Ticket',
    'Change Status',
  ];
  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameItemName',
    'gameItemDesc',
    'gameItemStatus',
    'action',
    'action2',
  ];
  data = [];

  gameTicketColumn = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item',
    'Game Item Desc',
    'Game Item Status',
    'Ticket Number',
    'Ticket Status',
    'Remark',
  ];
  gameTicketDataKey: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameItemName',
    'gameItemDesc',
    'gameItemStatus',
    'action',
    'action2',
  ];
  gameTicketData = [];

  gameItemType = 'text';
  gameItemDescType = 'text';
  ticketAmtType = 'text';
  gameItemValName = 'Please Enter Game Item';
  gameItemDescName = 'Please Enter Game Item Description';
  ticketAmtName = 'Please Enter Ticket Amount';
  gameItemVal = '';
  gameItemDescVal = '';
  ticketAmtVal = '';

  gameItemRawArr: {
    id: number;
    gameCode: string;
    gameName: string;
    gameItemName: string;
    gameItemDesc: string;
    gameItemStatus: boolean;
  }[] = [];

  constructor(
    private userData: UserDataService,
    private gameService: GameService,
    private gameItemService: GameItemService,
    private ticektCreateService: TicketCreateService,
    private tarotService: TarotServiceService
  ) {
    this.userData.getUserObservable().subscribe((userData) => {
      this.userRole = userData.role;
    });
  }

  async ngOnInit() {
    try {
      const resObj = await this.gameItemService.getGameItem().toPromise();
      console.log(resObj.gameItemDtos);
      this.data = resObj.gameItemDtos;
    } catch (err) {
      console.log(err);
    }
  }

  async onConfirm() {
    try {
      this.showPopup = true;
      let resObj = await this.gameService.getGameAll().toPromise();
      console.log(resObj);
      this.gameRawArr = resObj.gameList;
      this.gameStatusList = this.gameRawArr.map((game: any) => {
        return {
          label: game.gameName,
          value: game.gameCode,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
  onUpdateGame(game: any) {}

  payload: GameItem = {
    gameCode: '',
    gameItem: '',
    gameItemDesc: '',
    gameItemStatus: true,
  };

  async onGameItemAdd() {
    try {
      if (!this.selectedGameStatusList) {
        this.selectedGameStatusList = this.gameRawArr[0].gameCode;
      }
      let found = this.gameRawArr.find(
        (game) => game.gameCode === this.selectedGameStatusList
      );

      this.payload.gameCode = found?.gameCode;
      this.payload.gameItem = this.gameItemVal;
      this.payload.gameItemDesc = this.gameItemDescVal;

      const resObj = await this.gameItemService
        .saveGameItem(this.payload)
        .toPromise();
      console.log(resObj);
      if (resObj.status) {
        const resObj = await this.gameItemService.getGameItem().toPromise();
        this.data = resObj.gameItemDtos;
        this.onCancel();
      }
    } catch (err) {
      console.log(err);
    }
  }

  onCancel() {
    this.payload = {
      gameCode: '',
      gameItem: '',
      gameItemDesc: '',
      gameItemStatus: true,
    };
    this.selectedGameStatusList = null;
    this.gameRawArr = [];
    this.showPopup = false;
    this.gameTicketComponent = false;
    this.showCreateTicketPopUp = false;
    this.gameItemVal = '';
    this.gameItemDescVal = '';
  }

  onShowTicket(game: any) {
    this.gameTicketComponent = true;
  }

  updatePayload = {
    id: 0,
  };

  async onChangeGameItemStatus(gameItem: any) {
    try {
      this.updatePayload.id = gameItem.id;
      const resObj = await this.gameItemService
        .updateStatusGameItem(gameItem)
        .toPromise();
      if (resObj.status) {
        const resObj = await this.gameItemService.getGameItem().toPromise();
        this.data = resObj.gameItemDtos;
      }
    } catch (err) {
      console.log(err);
    }
  }

  onBack() {
    this.gameTicketComponent = false;
  }

  async onOpenCreateTicketPopUp() {
    try {
      this.showCreateTicketPopUp = true;
      let resObj = await this.gameService.getGameAll().toPromise();
      console.log(resObj);
      this.gameRawArr = resObj.gameList;
      this.gameStatusList = this.gameRawArr.map((game: any) => {
        return {
          label: game.gameName,
          value: game.gameCode,
        };
      });

      const gameItemResObj = await this.gameItemService
        .getGameItemByGame(this.gameRawArr[0].id)
        .toPromise();

      this.gameItemRawArr = gameItemResObj.gameItemDtos;

      console.log(this.gameItemRawArr);

      this.gameItemList = this.gameItemRawArr.map((gameItem: any) => {
        return {
          label: gameItem.gameItemName,
          value: gameItem.gameItemName,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  onGameConfirm() {
    if (!this.selectedGameStatusList) {
      this.selectedGameStatusList = this.gameRawArr[0].gameCode;
    } else {
      const currentGameObj = this.gameRawArr.find(
        (game) => game.gameCode === this.selectedGameStatusList
      );
    }
  }

  async onGameStatusChange(newValue: any) {
    try {
      let selectedGameObj = this.gameRawArr.find(
        (game) => game.gameCode === newValue
      );

      console.log(selectedGameObj);

      if (selectedGameObj?.gameCode === '0200') {
        const gameItemResObj = await firstValueFrom(
          this.tarotService.getTarotCardArrFromBackend()
        );
        this.gameItemRawArr = gameItemResObj.tarotList;

        console.log(this.gameItemRawArr);

        this.gameItemList = this.gameItemRawArr.map((gameItem: any) => {
          return {
            label: gameItem.name,
            value: gameItem.name_short,
          };
        });
      } else {
        const gameItemResObj = await firstValueFrom(
          this.gameItemService.getGameItemByGame(selectedGameObj!.id)
        );
        this.gameItemRawArr = gameItemResObj.gameItemDtos;

        console.log(this.gameItemRawArr);

        this.gameItemList = this.gameItemRawArr.map((gameItem: any) => {
          return {
            label: gameItem.gameItemName,
            value: gameItem.gameItemName,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  gameItemTicketCreatePayload: GamitemTicket = {
    gameId: 0,
    gameItemId: 0,
    ticketAmt: 0,
  };

  async onCreateGameTicket() {
    this.selectedGameStatusList =
      this.selectedGameStatusList !== null
        ? this.gameRawArr.find(
            (game) => game.gameCode === this.selectedGameStatusList
          )?.id
        : this.gameRawArr[0].id;

    console.log(this.selectedGameStatusList);

    let gameItemResObj: any;
    if (this.selectedGameStatusList === 3) {
      gameItemResObj = await firstValueFrom(
        this.tarotService.getTarotCardArrFromBackend()
      );
      console.log(gameItemResObj);
      this.gameItemRawArr = gameItemResObj.tarotList.map((card: any) => ({
        id: card.id,
        gameCode: '0200',
        gameName: 'Lucky Card',
        gameItemName: card.name,
        gameItemDesc: card.desc,
        gameItemStatus: true,
      }));
    } else {
      gameItemResObj = await this.gameItemService
        .getGameItemByGame(Number(this.selectedGameStatusList))
        .toPromise();
      console.log(gameItemResObj);
      this.gameItemRawArr = gameItemResObj.gameItemDtos;
    }

    this.selectedGameItemStatus =
      this.selectedGameItemStatus !== null
        ? this.gameItemRawArr.find(
            (game) => game.gameItemName === this.selectedGameItemStatus
          )?.id
        : this.gameItemRawArr[0].id;

    this.gameItemTicketCreatePayload.gameId = Number(
      this.selectedGameStatusList
    );
    this.gameItemTicketCreatePayload.gameItemId = Number(
      this.selectedGameItemStatus
    );
    this.gameItemTicketCreatePayload.ticketAmt = Number(this.ticketAmtVal);

    const resObj = await firstValueFrom(
      this.ticektCreateService.gameItemTicketCreate(
        this.gameItemTicketCreatePayload
      )
    );

    if (resObj.status) {
      this.onShowCreateTicketPopUp();
    }
  }

  onShowCreateTicketPopUp() {
    this.gameItemTicketCreatePayload.gameId =
      this.gameItemTicketCreatePayload.gameItemId =
      this.gameItemTicketCreatePayload.ticketAmt =
        0;

    this.selectedGameStatusList = this.selectedGameItemStatus = null;
    this.ticketAmtVal = '';
    this.showCreateTicketPopUp = false;
  }

  async onGameStatusChanged(value: string) {
    console.log(value);
    if (value === '0200') {
      this.noNeedForGameItem = true;
    } else {
      this.noNeedForGameItem = false;
    }
  }
}
