import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameItemService {
  gameItemSaveRoute = 'promotion/gi/gameItem';
  gameItemGetRoute = 'promotion/gi/gameItem';
  constructor(private apiCallService: ApiCallService) {}

  saveGameItem(data: any): Observable<any> {
    return this.apiCallService.post(this.gameItemSaveRoute, data);
  }

  getGameItem(): Observable<any> {
    return this.apiCallService.get(this.gameItemGetRoute);
  }

  updateStatusGameItem(payload: any): Observable<any> {
    return this.apiCallService.put(this.gameItemSaveRoute, payload);
  }

  getGameItemByGame(gameId: number): Observable<any> {
    let route = `${this.gameItemGetRoute}/${gameId}`;
    return this.apiCallService.get(route);
  }

  getLuckyCardGameItem(): Observable<any> {
    const route = 'promotion/trc/tarot';
    return this.apiCallService.get(route);
  }
}
