import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSubject = new BehaviorSubject<User>({
    randomId: '',
    role: '',
    ticketAmt: 0,
    sideMenu: [],
  });

  constructor() {}

  getUserObservable() {
    return this.userSubject.asObservable();
  }

  setRandomId(randomId: string) {
    const user = this.userSubject.value;
    this.userSubject.next({ ...user, randomId });
  }

  setRole(role: string) {
    const user = this.userSubject.value;
    this.userSubject.next({ ...user, role });
  }

  setTicketAmt(ticketAmt: number) {
    const user = this.userSubject.value;
    this.userSubject.next({ ...user, ticketAmt });
  }

  setSideMenu(sideMenu: any[]) {
    const user = this.userSubject.value;
    this.userSubject.next({ ...user, sideMenu });
  }

  clearUser() {
    this.userSubject.next({
      randomId: '',
      role: '',
      ticketAmt: 0,
      sideMenu: [],
    });
  }
}
