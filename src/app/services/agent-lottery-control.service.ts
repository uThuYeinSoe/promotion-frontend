import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';

import { SaveLottery } from '../models/save-lottery.model';

@Injectable({
  providedIn: 'root',
})
export class AgentLotteryControlService {
  agentLotteryControlUrl = 'promotion/alcc/lottery-control';
  agentLotteryCheckUrl = 'promotion/alcc/lottery-check?gameCode=';
  saveLotteryUrl = 'promotion/slc/sale-lottery';
  getLotteryRewardUrl = 'promotion/lr/lottery-reward';

  constructor(private apiCallService: ApiCallService) {}

  getAgentLotteryControl(): Observable<any> {
    return this.apiCallService.get(this.agentLotteryControlUrl);
  }

  changeStatusLotteryControlByLottery(data: any): Observable<any> {
    return this.apiCallService.post(this.agentLotteryControlUrl, data);
  }
  checkStatusLotteryByGame(data: string): Observable<any> {
    return this.apiCallService.get(`${this.agentLotteryCheckUrl}${data}`);
  }

  savingLotteryNumber(data: SaveLottery): Observable<any> {
    return this.apiCallService.post(this.saveLotteryUrl, data);
  }

  saveLotteryReward(data: any): Observable<any> {
    return this.apiCallService.post(this.getLotteryRewardUrl, data);
  }

  getLotteryReward(): Observable<any> {
    return this.apiCallService.get(this.getLotteryRewardUrl);
  }
}
