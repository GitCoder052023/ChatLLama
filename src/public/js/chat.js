import { appendMessage } from './chat/messageRenderer.js';
import { initializeSocketEvents } from './chat/socketHandler.js';
import { initProfile } from './chat/profileHandler.js';

const BACKEND_URL = 'http://192.168.1.2:5000';
const socket = io(BACKEND_URL);

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const sendButton = chatForm.querySelector('button[type="submit"]');

const streamHandler = initializeSocketEvents(socket, { chatWindow, sendButton, chatInput }, appendMessage);

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (streamHandler.isStreaming) {
    socket.emit('stop chat message');
    streamHandler.forceStop();
    return;
  }
  const message = chatInput.value.trim();
  if (!message) return;
  appendMessage(message, 'user');
  socket.emit('chat message', { message });
  chatInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  initProfile(BACKEND_URL);
});