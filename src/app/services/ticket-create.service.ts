import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketCreateService {
  constructor(private apiCallService: ApiCallService) {}

  ticketCreateHistoryRoute = 'promotion/tc/ticketHistory';
  ticketCreateRoute = 'promotion/tc/ticket';
  gameItemTicketCreateRoute = 'promotion/gtc/gameTicket';

  ticketCreateHistory(): Observable<any> {
    return this.apiCallService.get(this.ticketCreateHistoryRoute);
  }

  ticketCreate(ticketObj: any): Observable<any> {
    return this.apiCallService.post(this.ticketCreateRoute, ticketObj);
  }

  gameItemTicketCreate(data: any): Observable<any> {
    return this.apiCallService.post(this.gameItemTicketCreateRoute, data);
  }

  gameItemTicketGetByAgent(): Observable<any> {
    return this.apiCallService.get(this.gameItemTicketCreateRoute);
  }
}
