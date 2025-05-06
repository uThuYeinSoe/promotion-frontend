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
      console.log(this.allGameItemsObj);
      console.log(this.items);
    } catch (err) {}
  }

  rollDice() {
    this.isRolling = true;
    this.dice1 = 0;
    this.dice2 = 0;
    this.animation1 = true;
    setTimeout(() => (this.animation2 = true), 100);

    let newDice1: number;
    if (this.inputDice1 === 0) {
      newDice1 = this.getRandom();
    } else {
      newDice1 = Math.min(Math.max(this.inputDice1, 1), 6);
    }

    let newDice2: number;
    if (this.inputDice2 === 0) {
      newDice2 = this.getRandom();
    } else {
      newDice2 = Math.min(Math.max(this.inputDice2, 1), 6);
    }

    setTimeout(() => {
      this.dice1 = newDice1;
      this.dice2 = newDice2;
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
