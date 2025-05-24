import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentLotteryControlService } from '../../services/agent-lottery-control.service';
import { firstValueFrom } from 'rxjs';

import { SaveLottery } from '../../models/save-lottery.model';

@Component({
  selector: 'app-iphonelottery',
  imports: [CommonModule],
  templateUrl: './iphonelottery.component.html',
  styleUrl: './iphonelottery.component.scss',
  standalone: true,
})
export class IphonelotteryComponent {
  digit1: number = 0;
  digit2: number = 0;
  digit3: number = 0;
  numberRecords: string[] = [];
  currentNumber: string | null = null;
  goldLotteryAuthorize: boolean = false;

  constructor(private agentLotteryControlService: AgentLotteryControlService) {}

  async ngOnInit() {
    const resObj = await firstValueFrom(
      this.agentLotteryControlService.checkStatusLotteryByGame('0500')
    );
    console.log(resObj);
    this.goldLotteryAuthorize = resObj.status;
  }

  addNumber() {
    const number = `${this.digit1}${this.digit2}${this.digit3}`;
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
  }

  clearNumbers() {
    this.numberRecords = [];
    this.currentNumber = null;
    this.digit1 = 0;
    this.digit2 = 0;
    this.digit3 = 0;
  }

  incrementDigit(index: number) {
    if (index === 1 && this.digit1 < 9) {
      this.digit1++;
    } else if (index === 2 && this.digit2 < 9) {
      this.digit2++;
    } else if (index === 3 && this.digit3 < 9) {
      this.digit3++;
    }
  }

  decrementDigit(index: number) {
    if (index === 1 && this.digit1 > 0) {
      this.digit1--;
    } else if (index === 2 && this.digit2 > 0) {
      this.digit2--;
    } else if (index === 3 && this.digit3 > 0) {
      this.digit3--;
    }
  }

  saveLotteryPayload: SaveLottery = {
    lotteryNumber: '',
    gameCode: '0500',
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
