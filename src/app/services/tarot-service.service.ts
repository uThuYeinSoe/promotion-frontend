import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarotServiceService {
  constructor(
    private client: HttpClient,
    private apiCallService: ApiCallService
  ) {}

  getTarotCardArr(): Observable<any> {
    return this.client.get('/assets/tarotData.json');
  }

  getTarotCardArrFromBackend(): Observable<any> {
    const route = 'promotion/lcc/lucky-card';
    return this.apiCallService.get(route);
  }

  getTarotCardWinObj(): Observable<any> {
    const route = 'promotion/lrc/win-value';
    return this.apiCallService.get(route);
  }
}
