export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  createdAt: Date;
  image?:string | null;
}
export interface ChatRequest {
  prompt: string;
  image?: string | null; // Base64 string without the "data:image/..." prefix
}