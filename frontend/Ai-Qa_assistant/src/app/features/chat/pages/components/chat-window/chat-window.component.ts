import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChatApiService } from '../../../../../services/chat-api.service';
import { ChatMessage } from '../../../../../shared/models/chat-message.model';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown'; // Import MarkdownService

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements AfterViewChecked {
  @ViewChild('scrollArea') scrollArea!: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [
    { role: 'assistant', content: 'Hi! Ask me anything 🙂', createdAt: new Date() },
  ];

  inputText = '';
  loading = false;
  private isNearBottom = true; // Track if the user is at the bottom

  constructor(
    private chatApi: ChatApiService,
  ) {
  }

  // Monitor scroll position to see if user scrolled up
  onScroll() {
    const element = this.scrollArea.nativeElement;
    const threshold = 10; // Buffer in pixels
    const position = element.scrollTop + element.offsetHeight;
    const height = element.scrollHeight;
    
    // User is 'near bottom' if they are within the threshold
    this.isNearBottom = height - position < threshold;
  }

  ngAfterViewChecked() {
    // Only auto-scroll if the user hasn't manually scrolled up
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  send() {
    const question = this.inputText.trim();
    if (!question || this.loading) return;
    let payload={
      prompt:question,
      image:null
    }

    this.messages.push({ role: 'user', content: question, createdAt: new Date() });
    this.inputText = '';
    this.loading = true;
    this.isNearBottom = true; // Force scroll to bottom for new user message

    this.chatApi.ask(question)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.messages.push({
            role: 'assistant',
            content: res.answer, // Keep markdown formatting
            createdAt: new Date(),
          });
        },
        error: () => {
          this.messages.push({
            role: 'assistant',
            content: 'Something went wrong.',
            createdAt: new Date(),
          });
        },
      });
  }

  // Note: Removed bold-stripping replace() to let MarkdownComponent handle styling

  private scrollToBottom() {
    try {
      this.scrollArea.nativeElement.scrollTop = this.scrollArea.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}