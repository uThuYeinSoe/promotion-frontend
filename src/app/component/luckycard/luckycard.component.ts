import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarotServiceService } from '../../services/tarot-service.service';

@Component({
  selector: 'app-luckycard',
  imports: [CommonModule],
  templateUrl: './luckycard.component.html',
  styleUrl: './luckycard.component.scss',
  standalone: true,
})
export class LuckycardComponent implements OnInit {
  tarotBack: string = 'assets/tarot/back.jpg';
  tarotBackArr: string[] = [];

  flipped = false;
  selectedCard: any = null;

  tarotDataArr: [] = [];

  constructor(private tarotService: TarotServiceService) {}

  ngOnInit(): void {
    this.tarotBackArr = Array.from({ length: 78 }, (_, i) => i.toString()); // [0, 1, 2, ..., 75]
  }

  drawCard(value: string) {
    console.log(value);
  }

  reset() {
    this.flipped = false;
    setTimeout(() => {
      this.selectedCard = null;
    }, 600);
  }
}
