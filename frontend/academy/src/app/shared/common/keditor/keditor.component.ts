import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { KeditorService } from './keditor.service';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-keditor',
  templateUrl: './keditor.component.html',
  styleUrl: './keditor.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class KeditorComponent {
  messages = signal<any>([]);
  userMessage: string = '';
  userId = 'user_123'; // Có thể lấy từ Auth Service
  @Input() editorHeight:any='h-[80vh]';
  constructor(
    private _KeditorService: KeditorService,
    private sanitizer: DomSanitizer
  ) {}
  @ViewChild('editablechatAI') private editablechatAI!: ElementRef<HTMLDivElement>;
  ngAfterViewInit(): void {
    this.focusEditableDiv();
  }
  sanitizeHtml(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  // sendAIMessage(event: Event): void {
  //   const eventKey = event as KeyboardEvent;
  //   if (eventKey.key === 'Enter' && !eventKey.shiftKey) {
  //     event.preventDefault();
  //     this.userMessage = this.editablechatAI.nativeElement.textContent?.trim() || '';

  //     if (!this.userMessage) return;

  //     this.messages.update.push({ sender: 'user', text: this.userMessage });
  //     this.messages.push({ sender: 'bot', text: '...', isTyping: true });
  //     this.resetEditableDiv();

  //     const payload = { userId: this.userId, message: this.userMessage };

  //     this._KeditorService.sendMessage(payload).then((response: any) => {
  //       this.messages = this.messages.filter((msg) => !msg.isTyping);
  //       this.messages.push({ sender: 'bot', text: response });
  //       this.focusEditableDiv(); // Maintain focus after message received
  //     }).catch((error: any) => {
  //       console.error('Error sending message:', error);
  //       this.messages = this.messages.filter((msg) => !msg.isTyping); // Remove typing indicator on error
  //       this.messages.push({ sender: 'bot', text: 'An error occurred.' });
  //       this.focusEditableDiv();
  //     });
  //   }
  // }
  sendMessage(event: Event): void {
    const eventKey = event as KeyboardEvent;
    if (eventKey.key === 'Enter' && !eventKey.shiftKey) {
      event.preventDefault();
      this.userMessage = this.editablechatAI.nativeElement.textContent?.trim() || '';
      if (!this.userMessage) return;
      this.messages.update((messages) => [...messages, { sender: 'user', text: this.userMessage }]);
      this.messages.update((messages) => [...messages, { sender: 'bot', text: '...', isTyping: true }]);
      this.resetEditableDiv();
      const payload = { userId: this.userId, message: this.userMessage };
      this._KeditorService.sendMessage(payload).then((response: any) => {
        this.messages.update((messages) => messages.filter((msg: any) => !msg.isTyping));
        this.messages.update((messages) => [...messages, { sender: 'bot', text: response.reply }]);
        console.log(this.messages);   
        this.focusEditableDiv(); // Maintain focus after message received
      }).catch((error: any) => {
        console.error('Error sending message:', error);
        this.messages.update((messages) => messages.filter((msg: any) => !msg.isTyping)); // Remove typing indicator on error
        this.messages.update((messages) => [...messages, { sender: 'bot', text: 'An error occurred.' }]);
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
