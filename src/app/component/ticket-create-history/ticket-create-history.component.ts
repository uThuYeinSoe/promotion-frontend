import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { TicketCreateService } from '../../services/ticket-create.service';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-create-history',
  imports: [
    TableComponent,
    CustomPopupComponent,
    CommonModule,
    CustomInputComponent,
  ],
  templateUrl: './ticket-create-history.component.html',
  styleUrl: './ticket-create-history.component.scss',
  standalone: true,
})
export class TicketCreateHistoryComponent implements OnInit {
  columns = ['No', 'Ticket Amount', 'Created Date'];
  dataKeys: string[] = ['index', 'ticketAmt', 'crateTime'];
  data = [];

  showPopup = false;
  ticketAmtType = 'number';
  ticketAmt = '';
  ticketAmtName = 'Please Enter Ticket Amount';

  ticketPayLoad: Ticket = {
    ticketAmt: '',
  };

  constructor(private ticketCreateService: TicketCreateService) {}

  async ngOnInit() {
    try {
      let resObj = await this.ticketCreateService
        .ticketCreateHistory()
        .toPromise();
      this.data = resObj.adminTicketHistories;
      console.log(this.data);
    } catch (err) {
      console.log(err);
    }
  }

  onConfirm() {
    this.showPopup = true;
    console.log('Confirmed!');
  }

  onCancel() {
    this.showPopup = false;
    console.log('Cancelled!');
  }

  async ticketAmtConfirm() {
    try {
      this.ticketPayLoad.ticketAmt = this.ticketAmt;
      let resObj = await this.ticketCreateService
        .ticketCreate(this.ticketPayLoad)
        .toPromise();
      console.log(resObj);
      if (resObj.status) {
        let resObj = await this.ticketCreateService
          .ticketCreateHistory()
          .toPromise();
        this.data = resObj.adminTicketHistories;
        this.ticketPayLoad.ticketAmt = this.ticketAmt = '';
        this.showPopup = false;
      }
    } catch (err) {}
  }
}
