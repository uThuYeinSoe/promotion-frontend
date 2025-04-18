import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentCreateService {
  private agentCreateRoute: string = 'auth/agent/register';
  private agentGetAllRoute: string = 'promotion/uc/getAgent';

  constructor(private apiCallService: ApiCallService) {}

  agentCreate(data: any): Observable<any> {
    return this.apiCallService.post(this.agentCreateRoute, data);
  }

  agentGetAll(): Observable<any> {
    return this.apiCallService.get(this.agentGetAllRoute);
  }
}
