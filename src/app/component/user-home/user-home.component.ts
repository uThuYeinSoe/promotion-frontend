import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { LeaderBoardComponent } from '../leader-board/leader-board.component';
import { CardComponent } from '../card/card.component';
import { UserDataService } from '../../services/user-data.service';

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
export class UserHomeComponent implements OnInit {
  cardImage = 'assets/images/cardImg.png';
  cardTitle = 'Spin Wheel';
  cardPrice = '1';
  gameRoute = '';
  gameAccessComponentArr: any = [];

  constructor(private userData: UserDataService) {}

  ngOnInit(): void {
    this.userData.getUserObservable().subscribe((userData) => {
      this.gameAccessComponentArr = userData.game;
      console.log(this.gameAccessComponentArr);
    });
  }
}
