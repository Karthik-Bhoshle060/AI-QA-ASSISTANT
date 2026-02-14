
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest } from '../shared/models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private apiUrl = 'http://localhost:3000/api/chat/ask';

  constructor(private http: HttpClient) {}

  ask(question: string): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>(this.apiUrl, { prompt: question });
  }
  // ask(payload: ChatRequest): Observable<{ answer: string }> {
  //   // Angular handles the JSON.stringify() and Headers automatically
  //   return this.http.post<{ answer: string }>(this.apiUrl, payload);
  // }
}
