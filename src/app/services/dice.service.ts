import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  diceItemUrl = 'promotion/dice/gameItem';
  diceWinUrl = 'promotion/dice/winningValue';

  constructor(private apiCallService: ApiCallService) {}

  getDiceGameItem(): Observable<any> {
    return this.apiCallService.get(this.diceItemUrl);
  }

  getDiceWinObj(): Observable<any> {
    return this.apiCallService.get(this.diceWinUrl);
  }
}
