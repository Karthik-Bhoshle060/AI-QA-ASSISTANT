import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
//import { ChatPageComponent } from './chat-page/chat-page.component';
//import { ChatPageComponent } from './pages/chat-page/chat-page.component';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatPageComponent,
  },
];
