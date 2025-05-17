import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';
import { CreateReward } from '../models/create-reward.model';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  saveRewardRoute = 'promotion/rwc/reward';
  saveLuckyCardRewardUrl = 'promotion/lrc/lucky-card-reward';

  constructor(private apiCallService: ApiCallService) {}

  saveReward(data: CreateReward): Observable<any> {
    return this.apiCallService.post(this.saveRewardRoute, data);
  }

  saveLuckyCardReward(data: any): Observable<any> {
    return this.apiCallService.post(this.saveLuckyCardRewardUrl, data);
  }

  getRewardAll(): Observable<any> {
    return this.apiCallService.get(this.saveRewardRoute);
  }

  getLuckyCardRewardAll(): Observable<any> {
    return this.apiCallService.get(this.saveLuckyCardRewardUrl);
  }

  getRewardByGameItem(gameItemId: number): Observable<any> {
    return this.apiCallService.get(`${this.saveRewardRoute}/${gameItemId}`);
  }

  updateReward(data: any): Observable<any> {
    return this.apiCallService.put(this.saveRewardRoute, data);
  }
}
