import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kata-diveditable',
  imports: [CommonModule],
  templateUrl: './diveditable.html',
  styleUrls: ['./diveditable.scss']
})
export class DivEditableComponent implements AfterViewInit {
  @Input() value: any = 0;
  @Input() type: 'number' | 'string' = 'string';
  @Input() index: number | null = null;
  @Input() field!: keyof any;
  @Input() row: any;
  @Input() format: string = '1.0-2';
  @Input() validationRules: ((value: any) => { valid: boolean; error?: string }) | null = null;

  @Output() valueUpdated = new EventEmitter<{
    value: any;
    index: number | null;
    field: keyof any;
    row: any;
  }>();
  @Output() moveToNext = new EventEmitter<void>();

  @ViewChild('editableDiv') editableDiv!: ElementRef;

  isEditing = false;
  displayValue: string = '';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.updateDisplayValue();
  }

  private updateDisplayValue() {
    if (this.type === 'number') {
      const numValue = Number(this.value) || 0;
      this.displayValue = numValue.toFixed(parseInt(this.format.split('-')[1], 10));
    } else {
      this.displayValue = this.value?.toString() || '';
    }
    if (this.editableDiv) {
      this.renderer.setProperty(this.editableDiv.nativeElement, 'innerText', this.displayValue);
    }
  }

  startEditing() {
    if (!this.isEditing) {
      this.isEditing = true;
      setTimeout(() => {
        this.editableDiv.nativeElement.focus();
        const range = document.createRange();
        range.selectNodeContents(this.editableDiv.nativeElement);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }, 0);
    }
  }

  onBlur() {
    this.updateValue();
    this.isEditing = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.updateValue();
      this.isEditing = false;
      this.moveToNext.emit();
    } else if (event.key === 'Escape') {
      this.isEditing = false;
      this.updateDisplayValue();
    }
  }

  private updateValue() {
    const rawValue = this.editableDiv.nativeElement.innerText.trim();
    let newValue = this.type === 'number' ? Number(rawValue) || 0 : rawValue;

    if (this.validationRules) {
      const validationResult = this.validationRules(newValue);
      if (!validationResult.valid) {
        this.updateDisplayValue();
        return;
      }
    }

    this.value = newValue;
    this.valueUpdated.emit({
      value: newValue,
      index: this.index,
      field: this.field,
      row: this.row
    });
    this.updateDisplayValue();
  }
}