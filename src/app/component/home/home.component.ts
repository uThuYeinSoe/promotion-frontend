import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHomeComponent } from '../user-home/user-home.component';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, UserHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  constructor(private userDataService: UserDataService) {}

  userDataObj: any;

  ngOnInit(): void {
    this.userDataService.getUserObservable().subscribe((user) => {
      this.userDataObj = user;
      console.log(this.userDataObj);
    });
  }
}
