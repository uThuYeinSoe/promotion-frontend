import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { TarotServiceService } from '../../services/tarot-service.service';
import { firstValueFrom } from 'rxjs';

interface Card {
  shortName: string;
  flipped: boolean;
}

@Component({
  selector: 'app-luckycard',
  imports: [CommonModule],
  templateUrl: './luckycard.component.html',
  styleUrl: './luckycard.component.scss',
  standalone: true,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', [animate('0.5s ease-in')]),
      transition(':leave', [animate('0.5s ease-out')]),
    ]),
    trigger('bounce', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      transition(':enter', [
        animate(
          '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ transform: 'scale(1.2)' })
        ),
        animate('0.2s ease-out'),
      ]),
    ]),
    trigger('colorChange', [
      state('color1', style({ color: '#ffd700' })),
      state('color2', style({ color: '#00bcd4' })),
      transition('color1 <=> color2', animate('0.5s ease-in-out')),
    ]),
    trigger('bounceUpDown', [
      state('color1', style({ transform: 'translateY(0)' })),
      state('color2', style({ transform: 'translateY(-10px)' })),
      transition('color1 <=> color2', animate('0.5s ease-in-out')),
    ]),
    trigger('colorFade', [
      state('color1', style({ color: '#ff4081' })),
      state('color2', style({ color: '#40c4ff' })),
      transition('color1 <=> color2', animate('1s ease-in-out')),
    ]),
  ],
})
export class LuckycardComponent implements OnInit {
  cardBack: string = 'assets/tarot/back.jpg';
  cardFront: string = '';
  cards: Card[] = [];
  frontCardArr: string[] = [];
  selectedCard: Card | null = null;
  titleState = 'color1';
  messageState = 'color1';
  currentDate = 'Monday, May 19, 2025';
  currentTime = '08:22 PM';
  isFlipping = false;
  rewaardValue = '';

  constructor(private tarotService: TarotServiceService) {}

  async ngOnInit() {
    const prizes = [
      25000, 45000, 50000, 10000, 20000, 30000, 40000, 15000, 35000, 60000,
      70000, 80000, 90000, 100000, 5000, 75000, 25000, 45000, 50000, 10000,
      20000, 30000, 40000, 15000, 35000, 60000, 70000, 80000, 90000, 100000,
    ];

    try {
      const resObj = await firstValueFrom(this.tarotService.getTarotCardArr());
      console.log(resObj.cards);
      this.cards = resObj.cards.map((obj: any) => {
        return {
          shortName: obj.name_short,
          flipped: false,
        };
      });
      console.log(resObj);
      this.frontCardArr = resObj.cards.map(
        (obj: any) => `assets/tarot/${obj.name_short}.jpg`
      );
      console.log(this.frontCardArr);
    } catch (err) {
      console.log(err);
    }

    // Title color and bounce animation loop
    setInterval(() => {
      this.titleState = this.titleState === 'color1' ? 'color2' : 'color1';
    }, 1000);
    // Message color animation loop
    setInterval(() => {
      this.messageState = this.messageState === 'color1' ? 'color2' : 'color1';
    }, 2000);
  }

  async flipCard(card: Card) {
    if (this.isFlipping || card.flipped) return;
    this.isFlipping = true;
    try {
      const resObj = await firstValueFrom(
        this.tarotService.getTarotCardWinObj()
      );
      card.flipped = true;
      card.shortName = resObj.luckyCardWinObj.gameItemShortName;
      this.selectedCard = card;
      this.cardFront = `assets/tarot/${card.shortName}.jpg`;
      this.rewaardValue = resObj.luckyCardWinObj.rewardValue;
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      card.flipped = false;
      this.selectedCard = null;
      this.isFlipping = false;
      this.rewaardValue = '';
    }, 5000);
  }
}
