import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
})
export class CustomInputComponent {
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() placeHolder: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  setValueFromEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target?.value ?? '';
    this.value = value;
    this.valueChange.emit(value);
  }
}
