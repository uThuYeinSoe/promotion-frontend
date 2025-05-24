import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentLotteryControlService } from '../../services/agent-lottery-control.service';
import { firstValueFrom } from 'rxjs';

import { SaveLottery } from '../../models/save-lottery.model';

@Component({
  selector: 'app-lottery1002',
  imports: [CommonModule],
  templateUrl: './lottery1002.component.html',
  styleUrl: './lottery1002.component.scss',
  standalone: true,
})
export class Lottery1002Component {
  digit1: number = 0;
  digit2: number = 0;
  digit3: number = 0;
  digit4: number = 0;
  digit5: number = 0;
  digit6: number = 0;
  numberRecords: string[] = [];
  currentNumber: string | null = null;

  lottery1002Authorize: boolean = false;

  constructor(private agentLotteryControlService: AgentLotteryControlService) {}

  async ngOnInit() {
    const resObj = await firstValueFrom(
      this.agentLotteryControlService.checkStatusLotteryByGame('0700')
    );
    console.log(resObj);
    this.lottery1002Authorize = resObj.status;
  }

  incrementDigit(index: number) {
    if (index === 1 && this.digit1 < 9) {
      this.digit1++;
    } else if (index === 2 && this.digit2 < 9) {
      this.digit2++;
    } else if (index === 3 && this.digit3 < 9) {
      this.digit3++;
    } else if (index === 4 && this.digit4 < 9) {
      this.digit4++;
    } else if (index === 5 && this.digit4 < 9) {
      this.digit5++;
    } else if (index === 6 && this.digit4 < 9) {
      this.digit6++;
    }
  }

  decrementDigit(index: number) {
    if (index === 1 && this.digit1 > 0) {
      this.digit1--;
    } else if (index === 2 && this.digit2 > 0) {
      this.digit2--;
    } else if (index === 3 && this.digit3 > 0) {
      this.digit3--;
    } else if (index === 4 && this.digit3 > 0) {
      this.digit4--;
    } else if (index === 5 && this.digit3 > 0) {
      this.digit5--;
    } else if (index === 6 && this.digit3 > 0) {
      this.digit6--;
    }
  }

  addNumber() {
    const number = `${this.digit1}${this.digit2}${this.digit3}${this.digit4}${this.digit5}${this.digit6}`;
    this.currentNumber = number;
    if (this.numberRecords.length < 15) {
      this.numberRecords.push(number);
    } else {
      this.numberRecords.shift();
      this.numberRecords.push(number);
    }
    this.digit1 = 0;
    this.digit2 = 0;
    this.digit3 = 0;
    this.digit4 = 0;
    this.digit5 = 0;
    this.digit6 = 0;
  }

  clearNumbers() {
    this.numberRecords = [];
    this.currentNumber = null;
    this.digit1 = 0;
    this.digit2 = 0;
    this.digit3 = 0;
    this.digit4 = 0;
    this.digit5 = 0;
    this.digit6 = 0;
  }

  saveLotteryPayload: SaveLottery = {
    lotteryNumber: '',
    gameCode: '0700',
  };

  async confirmNumber() {
    console.log(this.currentNumber);
    if (this.currentNumber) {
      try {
        this.saveLotteryPayload.lotteryNumber = this.currentNumber;
        const resObj = await firstValueFrom(
          this.agentLotteryControlService.savingLotteryNumber(
            this.saveLotteryPayload
          )
        );
        console.log(resObj);
        if (resObj.status) {
          this.saveLotteryPayload.lotteryNumber = '';
          this.currentNumber = '';
        }
      } catch (err) {}
    }
  }
}
