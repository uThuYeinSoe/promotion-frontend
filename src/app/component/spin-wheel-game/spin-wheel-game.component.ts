import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinserviceService } from '../../services/spinservice.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-spin-wheel-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spin-wheel-game.component.html',
  styleUrl: './spin-wheel-game.component.scss',
})
export class SpinWheelGameComponent implements OnInit, AfterViewInit {
  wheelItems: any = [];

  allGameItemsObj: any = [];

  winingGameItemObj: any;

  wheelColors = [
    '#ff5733',
    '#ff8c00',
    '#ffda00',
    '#90ee90',
    '#00ffff',
    '#ff69b4',
    '#ba55d3',
    '#cd5c5c',
    '#ef4444',
    '#f97316',
    '#facc15',
    '#22c55e',
    '#14b8a6',
    '#3b82f6',
    '#8b5cf6',
    '#d946ef',
    '#ec4899',
    '#f43f5e',
    '#fb923c',
    '#84cc16',
    '#10b981',
    '#06b6d4',
    '#6366f1',
    '#a855f7',
  ];

  isSpinning = false;
  selectedItem: string | null = null;
  resultText: string = '';

  @ViewChild('wheel') wheel!: ElementRef;

  constructor(private spinServcie: SpinserviceService) {}

  async ngOnInit() {
    try {
      const resObj = await firstValueFrom(
        this.spinServcie.getSpinWheelGameItem()
      );
      this.allGameItemsObj = resObj.spinWheelGameItemObjList;
      this.wheelItems = this.allGameItemsObj.map(
        (game: any) => game.gameItemName
      );
    } catch (err) {
      console.log(err);
    }
  }

  ngAfterViewInit() {
    while (this.wheelItems.length < 15) {
      this.wheelItems.push('');
    }
  }

  async spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.selectedItem = null;
    this.resultText = '';

    const totalSlices = this.wheelItems.length;
    const sliceAngle = 360 / totalSlices;

    // ✨ ကိုယ်တိုင် ထိန်းချုပ်ချင်တဲ့ item ရဲ့ index ကို ထည့်ပါ။ ဥပမာ - index 5 ကို ရွေးချယ်ချင်ရင် 5 လို့ ထည့်ပါ။
    let desiredIndex = 6;

    try {
      let resObj = await this.spinServcie.getWinObj().toPromise();
      this.winingGameItemObj = resObj.spinWheelWinObj;
      desiredIndex = this.allGameItemsObj.findIndex(
        (game: any) => game.gameItemName === this.winingGameItemObj.gameItemName
      );
      console.log(this.winingGameItemObj);
    } catch (err) {}

    // ✨ index က wheelItems array ထဲမှာ ရှိနေလားဆိုတာကို စစ်ဆေးပါ။
    const randomIndex =
      desiredIndex >= 0 && desiredIndex < totalSlices
        ? desiredIndex
        : Math.floor(Math.random() * totalSlices);

    // 🎯 Calculate rotation to align the center of the selected slice with the top (0deg)
    const slicePosition = randomIndex * sliceAngle; // The angle where the slice starts

    // ✨ 2 slice စာ ရွှေ့ပေးခြင်း
    const offset = -2;
    const adjustedSlicePosition = (slicePosition + offset * sliceAngle) % 360;

    const rotation = 360 * 5 + (360 - adjustedSlicePosition) - sliceAngle / 2; // Spin 5 full rotations, then align the slice's center at 0deg

    this.wheel.nativeElement.style.transition = 'none';
    this.wheel.nativeElement.style.transform = 'rotate(0deg)';

    setTimeout(() => {
      this.wheel.nativeElement.style.transition = 'transform 5s ease-out';
      this.wheel.nativeElement.style.transform = `rotate(${rotation}deg)`;
    }, 10);

    setTimeout(() => {
      this.isSpinning = false;
      this.selectedItem = `You won ${this.winingGameItemObj.gameItemName} and Ticket Number is ${this.winingGameItemObj.ticketName}`;
    }, 5000);
  }

  getSliceRotation(index: number): number {
    return (360 / this.wheelItems.length) * index;
  }

  shuffleArray(array: any[]): any[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
