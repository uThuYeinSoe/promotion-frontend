import { Component } from '@angular/core';

import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
  selector: 'app-home',
  imports: [UserHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {}
