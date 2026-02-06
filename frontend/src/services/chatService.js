import { apiFetch } from './api';

export const createChatService = (listingId) =>
  apiFetch('/chats', { method: 'POST', body: JSON.stringify({ listingId }) });

export const getChatService = (chatId) => apiFetch(`/chats/${chatId}`);

export const addMessageService = (chatId, text) =>
  apiFetch(`/chats/${chatId}/message`, { method: 'POST', body: JSON.stringify({ text }) });
