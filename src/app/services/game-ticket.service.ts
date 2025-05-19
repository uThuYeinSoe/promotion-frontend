import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';
import { TicketCreate } from '../models/ticket-create.model';

@Injectable({
  providedIn: 'root',
})
export class GameTicketService {
  gameTicketByAgentUrl = 'promotion/gtc/game-ticket-agent';
  gameTicketUrl = 'promotion/gtc/game-ticket';
  luckyCardTicket = 'promotion/gtc/lucky-card-ticket';

  constructor(private apiCallService: ApiCallService) {}

  getGameTicketByAgent(): Observable<any> {
    return this.apiCallService.get(this.gameTicketByAgentUrl);
  }

  getLuckyCardTicketByAgent(): Observable<any> {
    return this.apiCallService.get(this.luckyCardTicket);
  }

  createLucyCardTicket(data: TicketCreate): Observable<any> {
    return this.apiCallService.post(this.luckyCardTicket, data);
  }

  createTicket(data: TicketCreate): Observable<any> {
    return this.apiCallService.post(this.gameTicketUrl, data);
  }
}
