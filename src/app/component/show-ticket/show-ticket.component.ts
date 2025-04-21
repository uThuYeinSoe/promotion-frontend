import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { TicketCreateService } from '../../services/ticket-create.service';

@Component({
  selector: 'app-show-ticket',
  imports: [CommonModule, TableComponent],
  templateUrl: './show-ticket.component.html',
  styleUrl: './show-ticket.component.scss',
})
export class ShowTicketComponent implements OnInit {
  columns = [
    'No',
    'Game Code',
    'Game Name',
    'Game Item',
    'Game Item Desc',
    'Game Item Status',
    'Ticket Number',
    'Ticket Status',
    'Remark',
  ];
  dataKeys: string[] = [
    'index',
    'gameCode',
    'gameName',
    'gameItem',
    'gameItemDesc',
    'gameItemStatus',
    'ticketNumber',
    'ticketStatus',
    'remark',
  ];
  data = [];

  constructor(private ticketCreateService: TicketCreateService) {}

  async ngOnInit() {
    try {
      const resObj = await this.ticketCreateService
        .gameItemTicketGetByAgent()
        .toPromise();
      this.data = resObj.gameTicketResObjList;
    } catch (err) {}
  }
}
