import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { UserDataService } from '../../services/user-data.service';
import { GameAuthorityCreateComponent } from '../game-authority-create/game-authority-create.component';
import { ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-game-authority',
  imports: [CommonModule, TableComponent, GameAuthorityCreateComponent],
  templateUrl: './game-authority.component.html',
  styleUrl: './game-authority.component.scss',
  standalone: true,
})
export class GameAuthorityComponent {
  showGameCreatePage = false;
  columns = ['No', 'Agent Random Id', 'Game Authorize Level'];
  dataKeys: string[] = ['index', 'agentRandomId', 'gameAuthorityInfos'];
  data = [];

  user: any = null;

  constructor(
    private userDataService: UserDataService,
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService
  ) {
    userDataService
      .getUserObservable()
      .subscribe((userData) => (this.user = userData));

    this.data = this.user.gameAuthority.map((item: any, index: any) => ({
      index: index + 1,
      agentRandomId: item.agentRandomId,
      gameAuthorityInfos: item.gameAuthorityInfos
        .map((g: any) => g.gameName)
        .join(', '),
    }));
  }

  onConfirm() {
    this.showGameCreatePage = true;
  }

  async backConfirm() {
    try {
      let profileObj = await this.profileService.getUserProfile().toPromise();
      this.userDataService.setGameAuthority(profileObj.agentGameAuthorityList);

      this.userDataService
        .getUserObservable()
        .subscribe((userData) => (this.user = userData));

      this.data = this.user.gameAuthority.map((item: any, index: any) => ({
        index: index + 1,
        agentRandomId: item.agentRandomId,
        gameAuthorityInfos: item.gameAuthorityInfos
          .map((g: any) => g.gameName)
          .join(', '),
      }));
      this.showGameCreatePage = false;
      this.cdr.detectChanges();
    } catch (err) {
      console.log(err);
    }
  }
}
