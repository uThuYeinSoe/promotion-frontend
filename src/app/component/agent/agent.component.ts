import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { AgentCreateService } from '../../services/agent-create.service';
import { TicketTransferService } from '../../services/ticket-transfer.service';
import { Agent } from '../../models/agent.model';
import { TicketTransfer } from '../../models/ticket-transfer.model';

@Component({
  selector: 'app-agent',
  imports: [
    CommonModule,
    TableComponent,
    CustomPopupComponent,
    CustomInputComponent,
  ],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss',
  standalone: true,
})
export class AgentComponent implements OnInit {
  showPopup = false;
  ticketTransferPopup = false;
  inputDisabled = true;

  agentCreateType = 'text';
  agentPassword = '';
  agentPasswordName = 'Please Enter Agent Password';

  ticketTransferId = '';
  agentTransferIdType = 'text';

  ticketTransferAmt = '';
  ticketTransferAmtType = 'text';
  ticketTransferAmtTypeName = 'Please Enter Transfer Ticket Amount';

  columns = ['No', 'Agent Random Id', 'Ticket Amount', 'Agent Ticket Transfer'];
  dataKeys: string[] = ['index', 'agentRandomId', 'agentAmt', 'action'];
  data = [];

  constructor(
    private agentCreateService: AgentCreateService,
    private ticketTransferService: TicketTransferService
  ) {}

  async ngOnInit() {
    try {
      let resObj = await this.agentCreateService.agentGetAll().toPromise();
      console.log(resObj);
      this.data = resObj.agents;
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

  onTransferPopUpCancle() {
    this.ticketTransferPopup = false;
    console.log('Cancelled!');
  }

  agentPayLoad: Agent = {
    password: '',
  };

  async agentCreate() {
    try {
      this.agentPayLoad.password = this.agentPassword;
      let resObj = await this.agentCreateService
        .agentCreate(this.agentPayLoad)
        .toPromise();
      console.log(resObj);
      if (resObj.status) {
        let resObj = await this.agentCreateService.agentGetAll().toPromise();
        this.data = resObj.agents;
        this.agentPayLoad.password = this.agentPassword = '';
        this.showPopup = false;
      }
    } catch (err) {}
  }

  onAgentAction(agent: any) {
    this.ticketTransferPopup = true;
    this.ticketTransferId = agent.agentRandomId;
    console.log(this.ticketTransferId);
    console.log(this.ticketTransferAmt);
  }

  ticketTransferPayload: TicketTransfer = {
    receiverRandomId: '',
    ticketAmt: 0,
  };

  async ticketTransfer() {
    try {
      this.ticketTransferPayload.receiverRandomId = this.ticketTransferId;
      this.ticketTransferPayload.ticketAmt = Number(this.ticketTransferAmt);

      let resObj = await this.ticketTransferService
        .ticketTransfer(this.ticketTransferPayload)
        .toPromise();
      console.log(resObj);

      if (resObj.status) {
        let resObj = await this.agentCreateService.agentGetAll().toPromise();
        this.data = resObj.agents;
        this.ticketTransferPayload.receiverRandomId =
          this.ticketTransferId =
          this.ticketTransferAmt =
            '';
        this.ticketTransferPayload.ticketAmt = 0;
        this.ticketTransferPopup = false;
      }
    } catch (err) {}
  }
}
