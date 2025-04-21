import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() dataKeys: string[] = [];
  @Input() data: any[] = [];

  @Output() actionClicked = new EventEmitter<any>();
  @Output() action2Clickd = new EventEmitter<any>();

  onAction(row: any) {
    this.actionClicked.emit(row);
  }
  onAction2(row: any) {
    this.action2Clickd.emit(row);
  }
}
