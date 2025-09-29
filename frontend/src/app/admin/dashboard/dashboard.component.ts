import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  messages: any[] = [];
  userMessage: string = '';
  userId = 'user_123'; // Có thể lấy từ Auth Service

  constructor(private _DashboardService: DashboardService) {}
  @ViewChild('editablechatAI') private editablechatAI!: ElementRef<HTMLDivElement>;
  ngAfterViewInit(): void {
    this.focusEditableDiv();
  }

  sendMessage(event: Event): void {
    const eventKey = event as KeyboardEvent;
    if (eventKey.key === 'Enter' && !eventKey.shiftKey) {
      event.preventDefault();
      this.userMessage = this.editablechatAI.nativeElement.textContent?.trim() || '';

      if (!this.userMessage) return;

      this.messages.push({ sender: 'user', text: this.userMessage });
      this.messages.push({ sender: 'bot', text: '...', isTyping: true });
      this.resetEditableDiv();

      const payload = { userId: this.userId, message: this.userMessage };

      this._DashboardService.sendMessage(payload).then((response: any) => {
        this.messages = this.messages.filter((msg) => !msg.isTyping);
        this.messages.push({ sender: 'bot', text: response });
        this.focusEditableDiv(); // Maintain focus after message received
      }).catch((error: any) => {
        console.error('Error sending message:', error);
        this.messages = this.messages.filter((msg) => !msg.isTyping); // Remove typing indicator on error
        this.messages.push({ sender: 'bot', text: 'An error occurred.' });
        this.focusEditableDiv();
      });
    }
  }

  private resetEditableDiv(): void {
    if (this.editablechatAI) {
      this.editablechatAI.nativeElement.textContent = '';
      this.focusEditableDiv();
    }
  }

  private focusEditableDiv(): void {
    if (this.editablechatAI) {
      this.editablechatAI.nativeElement.focus();
    }
  }

  isDragging = false;
  handlePaste(event: ClipboardEvent) {

  }
  handleInput(event: Event) {

  }
  onDragOver(event: DragEvent) {
  }
  onDragLeave(event: DragEvent) {
  }
  onInput(event: Event) {
  }
  onDrop(event: DragEvent) {
  }
  onFileSelected(event: Event) {
  }
  uploadDriver(event: Event){
  }

}
