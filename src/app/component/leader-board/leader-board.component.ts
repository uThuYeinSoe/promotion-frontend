import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leader-board',
  imports: [CommonModule],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss',
  standalone: true,
})
export class LeaderBoardComponent {
  profileImage = 'assets/images/profile.jpg';
}
