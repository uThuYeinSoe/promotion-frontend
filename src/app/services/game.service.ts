import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameCreateRoute = 'promotion/g/game';
  getGameAllRoute = 'promotion/g/gameAll';
  assigngameRoute = 'promotion/g/assignGame';

  constructor(private apiCallService: ApiCallService) {}

  gameCreate(gameObj: any): Observable<any> {
    return this.apiCallService.post(this.gameCreateRoute, gameObj);
  }

  gameUpdate(gameUpdatePayload: any): Observable<any> {
    return this.apiCallService.put(this.gameCreateRoute, gameUpdatePayload);
  }

  getGameAll(): Observable<any> {
    return this.apiCallService.get(this.getGameAllRoute);
  }

  assignGame(payload: any): Observable<any> {
    return this.apiCallService.post(this.assigngameRoute, payload);
  }
}
