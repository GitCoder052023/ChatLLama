import { appendMessage } from './chat/messageRenderer.js';
import { initializeSocketEvents } from './chat/socketHandler.js';
import { initProfile } from './chat/profileHandler.js';

const backendHost = document.querySelector('meta[name="backend-host"]').content;
const BACKEND_URL = `http://${backendHost}:5000`;
const socket = io(BACKEND_URL);

function createGreetingContainer() {
    const username = localStorage.getItem('username');
    const container = document.createElement('div');
    container.id = 'greeting-container';
    container.className = 'flex justify-center items-center my-8';
    container.style.transition = 'opacity 0.5s ease';

    const heading = document.createElement('h1');
    heading.className = 'text-4xl md:text-6xl font-google-sans font-bold';
    heading.style.background = 'linear-gradient(90deg, #4285f4, #ea4335)';
    heading.style.webkitBackgroundClip = 'text';
    heading.style.backgroundClip = 'text';
    heading.style.webkitTextFillColor = 'transparent';
    heading.style.textAlign = 'center';
    heading.innerHTML = `Hello, ${username}`;

    container.appendChild(heading);
    return container;
}

document.addEventListener('DOMContentLoaded', async () => {
    initProfile(BACKEND_URL);
    
    const chatWindow = document.getElementById('chat-window');
    
    chatWindow.appendChild(createGreetingContainer());

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendButton = chatForm.querySelector('button[type="submit"]');

    chatForm.addEventListener('submit', (e) => {
        const greetingElem = document.getElementById('greeting-container');
        if (greetingElem) {
            greetingElem.classList.add('fade-out');
            setTimeout(() => {
                if (greetingElem.parentNode) {
                    greetingElem.parentNode.removeChild(greetingElem);
                }
            }, 500); 
        }
        
        e.preventDefault();
        if (streamHandler.isStreaming) {
            socket.emit('stop chat message');
            streamHandler.forceStop();
            return;
        }
        const message = chatInput.value.trim();
        if (!message) return;
        
        appendMessage(message, 'user');
        socket.emit('chat message', { 
            message
        });
        chatInput.value = '';
    });
    
    document.getElementById('new-chat').addEventListener('click', () => {
        chatWindow.innerHTML = '';
        chatWindow.appendChild(createGreetingContainer());
    });
    
    const streamHandler = initializeSocketEvents(
        socket, 
        { chatWindow, sendButton, chatInput }, 
        appendMessage
    );

    const sidebar = document.getElementById('sidebar');
    const headerTitle = document.getElementById('header-title');

    headerTitle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.innerWidth < 768) {
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                sidebar.classList.add('translate-x-0');
            } else {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('-translate-x-full');
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(e.target) && !e.target.closest('#header-title')) {
                if (sidebar.classList.contains('translate-x-0')) {
                    sidebar.classList.remove('translate-x-0');
                    sidebar.classList.add('-translate-x-full');
                }
            }
        }
    });
});