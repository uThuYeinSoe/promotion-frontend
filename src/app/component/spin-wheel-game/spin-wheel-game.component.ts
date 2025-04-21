import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spin-wheel-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spin-wheel-game.component.html',
  styleUrl: './spin-wheel-game.component.scss',
})
export class SpinWheelGameComponent implements AfterViewInit {
  wheelItems = [
    'i Phone',
    'Samsung Phone',
    'Power Bank',
    'Unit 1000',
    '100000',
    'Unit 1000',
    '20000',
    'Unit 1000',
    'Thank You',
    'Unit 1000',
    'Thanks You',
    'Unit 30000',
    'Unit 1000',
    'Unit 7000',
    'Unit 1000',
    'Unit 5000',
  ];

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

  ngAfterViewInit() {
    while (this.wheelItems.length < 15) {
      this.wheelItems.push('');
    }
  }

  spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.selectedItem = null;
    this.resultText = '';

    const totalSlices = this.wheelItems.length;
    const sliceAngle = 360 / totalSlices;

    // ✨ ကိုယ်တိုင် ထိန်းချုပ်ချင်တဲ့ item ရဲ့ index ကို ထည့်ပါ။ ဥပမာ - index 5 ကို ရွေးချယ်ချင်ရင် 5 လို့ ထည့်ပါ။
    const desiredIndex = 6;

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
      this.selectedItem = this.wheelItems[randomIndex];
      this.resultText = `You won ${this.getSliceName(this.selectedItem)}!`;
    }, 5000);
  }

  getSliceRotation(index: number): number {
    return (360 / this.wheelItems.length) * index;
  }

  getSliceName(item: string): string {
    const nameMap: { [key: string]: string } = {
      'assets/ear.png': 'Ear',
      'assets/gift.png': 'Gift',
      'assets/star.png': 'Star',
      'assets/prize.png': 'Prize',
      'assets/earbuds.png': 'Earbuds',
      'assets/lovepik-money.png': 'Money',
      'assets/coin.png': 'Coin',
      'assets/powerbank.png': 'Powerbank',
      'assets/phone.png': 'Phone',
    };
    return nameMap[item] || item; // image မဟုတ်ရင် item ကိုပြပေး
  }
}
