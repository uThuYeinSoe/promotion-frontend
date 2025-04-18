import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-popup',
  imports: [CommonModule],
  templateUrl: './custom-popup.component.html',
  styleUrl: './custom-popup.component.scss',
  standalone: true,
})
export class CustomPopupComponent {
  @Input() title: string = '';
  @Input() message: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
