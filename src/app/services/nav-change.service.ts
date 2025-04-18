import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavChangeService {
  private navCodeSource = new BehaviorSubject<string>('01000');
  navCode$ = this.navCodeSource.asObservable();
  constructor() {}

  updateNavCode(code: string) {
    this.navCodeSource.next(code);
  }
}
