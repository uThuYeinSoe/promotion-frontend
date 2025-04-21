import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';
import { UserDataService } from '../../services/user-data.service';
import { RouterModule } from '@angular/router';
import { NavChangeService } from '../../services/nav-change.service';

@Component({
  selector: 'app-left-side',
  imports: [CommonModule, RouterModule],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss',
  standalone: true,
})
export class LeftSideComponent implements OnInit {
  @Output() navCodeChange = new EventEmitter<string>();
  navCode = '01000';

  menuItem: MenuItem[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Home',
      value: '01000',
    },
    {
      icon: 'fa-solid fa-receipt',
      label: 'Agent',
      value: '02000',
    },
    {
      icon: 'fa-solid fa-receipt',
      label: 'Ticket Create History',
      value: '03000',
    },
    {
      icon: 'fa-solid fa-money-bill-transfer',
      label: 'Ticket Transaction History',
      value: '04000',
    },
    {
      icon: 'fa-solid fa-gamepad',
      label: 'Game',
      value: '05000',
    },
    {
      icon: 'fa-solid fa-gamepad',
      label: 'Game Authorize',
      value: '08000',
    },
    {
      icon: 'fa-solid fa-gamepad',
      label: 'Game Item',
      value: '09000',
    },
    {
      icon: 'fa-solid fa-trophy',
      label: 'Reward',
      value: '06000',
    },

    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Log Out',
      value: '07000',
    },
  ];

  allowanceMenuList: any[] = [];

  filteredMenuItem: MenuItem[] = [];

  constructor(
    private userDataService: UserDataService,
    private navChangeService: NavChangeService
  ) {}

  ngOnInit(): void {
    this.userDataService.getUserObservable().subscribe((user) => {
      this.allowanceMenuList = user.sideMenu;
      const allowedCodes = this.allowanceMenuList.map((nav) => nav.navCode);
      this.filteredMenuItem = this.menuItem.filter((item) =>
        allowedCodes.includes(item.value)
      );
    });
  }

  onItemClick(value: string): void {
    this.navChangeService.updateNavCode(value);
  }
}
