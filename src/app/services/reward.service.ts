import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable, of } from 'rxjs';
import { CreateReward } from '../models/create-reward.model';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  saveRewardRoute = 'promotion/rwc/reward';

  constructor(private apiCallService: ApiCallService) {}

  saveReward(data: CreateReward): Observable<any> {
    return this.apiCallService.post(this.saveRewardRoute, data);
  }

  getRewardAll(): Observable<any> {
    return this.apiCallService.get(this.saveRewardRoute);
  }
}
