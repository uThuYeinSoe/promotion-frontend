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

  constructor(private apiCallService: ApiCallService) {}

  getGameTicketByAgent(): Observable<any> {
    return this.apiCallService.get(this.gameTicketByAgentUrl);
  }

  createTicket(data: TicketCreate): Observable<any> {
    return this.apiCallService.post(this.gameTicketUrl, data);
  }
}
