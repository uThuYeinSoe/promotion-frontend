import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private route: string = 'promotion/uc/profile';

  constructor(private apiCallService: ApiCallService) {}

  getUserProfile(): Observable<any> {
    return this.apiCallService.get(this.route);
  }
}
