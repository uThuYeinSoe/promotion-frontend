import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';

import { SpinserviceService } from '../../services/spinservice.service';

@Component({
  selector: 'app-dice',
  imports: [CommonModule, NgStyle, NgClass],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss',
  standalone: true,
})
export class DiceComponent implements OnInit {
  dice1 = 0;
  dice2 = 0;
  private inputDice1 = 0;
  private inputDice2 = 0;
  min = 1;
  max = 6;
  isRolling = false;
  dice1Transform = '';
  dice2Transform = '';
  animation1 = false;
  animation2 = false;
  scoreAnimation = false;
  winningItem: number | string | null = null;

  allGameItemsObj: any;

  items: (number | string | null)[] = [];
  scores: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0];

  private faceTransforms: { [key: number]: string } = {
    1: 'rotateY(0deg)',
    2: 'rotateY(180deg)',
    3: 'rotateY(-90deg)',
    4: 'rotateY(90deg)',
    5: 'rotateX(-90deg)',
    6: 'rotateX(90deg)',
  };

  constructor(private spinServcie: SpinserviceService) {}

  async ngOnInit() {
    try {
      const resObj = await this.spinServcie.getGameItemByGameId(4).toPromise();
      this.allGameItemsObj = resObj.gameItemDtos;
      this.items = this.allGameItemsObj.map((game: any) => game.gameItemDesc);
    } catch (err) {}
  }

  dice1Val: number = 0;
  dice2Val: number = 0;

  async rollDice() {
    this.isRolling = true;
    this.dice1 = 0;
    this.dice2 = 0;

    try {
      const resObj = await this.spinServcie.getDiceWinObj().toPromise();
      this.dice1Val = resObj.diceWinObj.diceNumberObjList[0];
      this.dice2Val = resObj.diceWinObj.diceNumberObjList[1];
      console.log(resObj);
      console.log(this.dice1Val);
      console.log(this.dice2Val);
    } catch (err) {
      console.log(err);
    }

    this.animation1 = true;
    setTimeout(() => (this.animation2 = true), 100);

    setTimeout(() => {
      this.dice1 = this.dice1Val;
      this.dice2 = this.dice2Val;
      console.log(this.dice1);
      console.log(this.dice2);
      this.dice1Transform = this.faceTransforms[this.dice1];
      this.dice2Transform = this.faceTransforms[this.dice2];
      const total = this.dice1 + this.dice2;
      this.winningItem = this.items[total - 2];
      this.animation1 = false;
      this.animation2 = false;
      this.scoreAnimation = true; // Trigger score animation
      this.isRolling = false;
    }, 2000); // Match the animation duration (2s)
  }

  getRandom(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }
}
