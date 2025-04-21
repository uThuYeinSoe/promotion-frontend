import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cardImage = 'assets/images/cardImg.png';

  constructor(private router: Router) {}

  goGame() {
    this.router.navigate(['/spinwheel']);
  }
}
