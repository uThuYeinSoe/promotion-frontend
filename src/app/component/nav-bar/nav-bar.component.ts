import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  logoUrl: string = 'assets/images/logo.png';
  userRandomId: string = '';
  userRole: string = '';

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUserObservable().subscribe((user) => {
      this.userRandomId = user.randomId;
      this.userRole = user.role;
    });
  }
}
