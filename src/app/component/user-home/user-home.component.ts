import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { LeaderBoardComponent } from '../leader-board/leader-board.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-user-home',
  imports: [
    CommonModule,
    BannerSliderComponent,
    LeaderBoardComponent,
    CardComponent,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
  standalone: true,
})
export class UserHomeComponent {}
