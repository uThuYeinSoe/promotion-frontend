import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinserviceService {
  gameItemByGameIdRoute = 'promotion/gi/gameItem/';
  getWinObjUrl = 'promotion/pinwheel/winningValue';
  diceWinUrl = 'promotion/dice/winningValue';

  constructor(private apiCallService: ApiCallService) {}

  getGameItemByGameId(gameId: number): Observable<any> {
    let innerRoute = `${this.gameItemByGameIdRoute}${gameId}`;
    return this.apiCallService.get(innerRoute);
  }

  getSpinWheelGameItem(): Observable<any> {
    let innerRoute = 'promotion/pinwheel/gameItem';
    return this.apiCallService.get(innerRoute);
  }

  getWinObj(): Observable<any> {
    return this.apiCallService.get(this.getWinObjUrl);
  }

  getDiceWinObj(): Observable<any> {
    return this.apiCallService.get(this.diceWinUrl);
  }
}
