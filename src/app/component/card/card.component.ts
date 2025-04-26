import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardImage = '';
  @Input() cardTitle = '';
  @Input() cardPrice = '';
  @Input() gameRoute = '';

  constructor(private router: Router) {}

  goGame() {
    this.router.navigate([`/${this.gameRoute}`]);
  }
}
