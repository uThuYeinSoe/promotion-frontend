import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { TicketTransferService } from '../../services/ticket-transfer.service';

@Component({
  selector: 'app-ticket-transaction-history',
  imports: [TableComponent],
  templateUrl: './ticket-transaction-history.component.html',
  styleUrl: './ticket-transaction-history.component.scss',
  standalone: true,
})
export class TicketTransactionHistoryComponent {
  columns = [
    'No',
    'Sender Id',
    'Ticket Amount',
    'Receiver Id',
    'Transfer Date',
  ];
  dataKeys: string[] = [
    'index',
    'senderRandomId',
    'ticketAmt',
    'receiverRandomId',
    'transferDateTime',
  ];
  data = [];

  constructor(private ticketTransferService: TicketTransferService) {}

  async ngOnInit() {
    try {
      let resObj = await this.ticketTransferService
        .getTicketTransferHistory()
        .toPromise();
      console.log(resObj);
      this.data = resObj.ticketTransactionHistories;
      console.log(this.data);
    } catch (err) {
      console.log(err);
    }
  }
}
