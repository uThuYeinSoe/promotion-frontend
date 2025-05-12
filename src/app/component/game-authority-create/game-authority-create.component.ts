import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { AgentCreateService } from '../../services/agent-create.service';
import { TableComponent } from '../table/table.component';
import { GameService } from '../../services/game.service';
import { Agentngameauthority } from '../../models/agentngameauthority.model';

@Component({
  selector: 'app-game-authority-create',
  imports: [CommonModule, CustomSelectComponent, TableComponent],
  templateUrl: './game-authority-create.component.html',
  styleUrl: './game-authority-create.component.scss',
  standalone: true,
})
export class GameAuthorityCreateComponent implements OnInit {
  agentSelectedDisabled = false;
  showGameCatComponent = false;

  agentStatus: { label: string; value: string }[] = [];
  selectedAgentStatusList: string | null = null;

  gameStatus: { label: string; value: string; gameCode: string }[] = [];
  selectedGameStatus: string | null = null;

  columns = ['No', 'Game Name', 'Game Code', 'Remove'];
  dataKeys: string[] = ['index', 'label', 'gameCode', 'action'];
  data: { label: string; value: string; gameCode: string }[] = [];

  gameRawData = {
    gameName: '',
    gameCode: '',
  };

  constructor(
    private agentService: AgentCreateService,
    private gameService: GameService
  ) {}

  async ngOnInit() {
    try {
      const resObj = await this.agentService.agentGetAll().toPromise();
      console.log(resObj);
      this.agentStatus = resObj.agents.map((agent: any) => ({
        label: agent.agentRandomId,
        value: agent.agentRandomId,
      }));

      const gameResObj = await this.gameService.getGameAll().toPromise();
      console.log(gameResObj);
      this.gameStatus = gameResObj.gameList.map((game: any) => ({
        label: game.gameName,
        value: game.gameName,
        gameCode: game.gameCode,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  agentConfirm() {
    this.showGameCatComponent = true;
    this.selectedAgentStatusList =
      this.selectedAgentStatusList !== null
        ? this.selectedAgentStatusList
        : this.agentStatus[0]?.value;
    this.agentSelectedDisabled = true;
    console.log(this.selectedAgentStatusList);
  }

  gameConfirm() {
    console.log(this.gameStatus);
    console.log(this.selectedGameStatus);

    this.selectedGameStatus =
      this.selectedGameStatus === null
        ? this.gameStatus[0].value
        : this.selectedGameStatus;

    let tempObj = this.gameStatus.find(
      (game) => game.label === this.selectedGameStatus
    );

    console.log(tempObj);
    this.data.push(tempObj!);
    // this.selectedAgentStatusList =
    //   this.selectedAgentStatusList !== null
    //     ? this.selectedAgentStatusList
    //     : this.agentStatus[0]?.value;
    // this.agentSelectedDisabled = true;
    // console.log(this.selectedAgentStatusList);
  }

  onRemoveGameList(game: any) {
    console.log(this.data);
    this.data = this.data.filter((dataGame) => dataGame.label !== game.label);
    console.log(this.data);
  }

  payload: Agentngameauthority = {
    randomId: '',
    gameUpdateRequestList: [],
  };

  async agentAndGameAuthSubmit() {
    try {
      if (this.data.length > 0) {
        this.payload.randomId = this.selectedAgentStatusList!;
        let gameUpdateRequestList = this.data.map((obj) => ({
          gameCode: obj.gameCode,
        }));

        this.payload.gameUpdateRequestList = gameUpdateRequestList;
        const resObj = await this.gameService
          .assignGame(this.payload)
          .toPromise();
        console.log(resObj);
        if (resObj.status) {
          this.agentSelectedDisabled = false;
          this.showGameCatComponent = false;

          this.payload = {
            randomId: '',
            gameUpdateRequestList: [],
          };

          this.data = [];
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
