import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketTransferService {
  constructor(private apiCallService: ApiCallService) {}

  ticketTransferUrl = 'promotion/tt/ticketTransfer';
  getTicketTransferUrl = 'promotion/tt/ticketTransfer';

  ticketTransfer(data: any): Observable<any> {
    return this.apiCallService.post(this.ticketTransferUrl, data);
  }

  getTicketTransferHistory(): Observable<any> {
    return this.apiCallService.get(this.getTicketTransferUrl);
  }
}
