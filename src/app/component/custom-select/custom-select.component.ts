import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  imports: [FormsModule, CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  standalone: true,
})
export class CustomSelectComponent {
  @Input() options: Array<{ label: string; value: any }> = [];
  @Input() placeholder: string = 'Select one';
  @Input() disabled: boolean = false;
  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }
}
