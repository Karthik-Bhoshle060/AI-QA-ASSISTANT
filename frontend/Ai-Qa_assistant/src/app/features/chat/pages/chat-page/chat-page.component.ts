
import { Component } from '@angular/core';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';


@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatWindowComponent],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {}
