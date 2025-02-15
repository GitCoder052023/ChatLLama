export function appendMessage(html, sender = 'bot') {
    const chatWindow = document.getElementById('chat-window');
    const container = document.createElement('div');
    container.className = 'message-container flex flex-col w-full';

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`;

    const avatar = document.createElement('div');
    avatar.className = `w-9 h-9 flex items-center justify-center rounded-xl ${sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'}`;
    avatar.innerHTML =
        sender === 'user'
            ? '<i class="fas fa-user text-white text-sm"></i>'
            : '<i class="fas fa-robot text-gray-600 text-lg"></i>';

    const bubble = document.createElement('div');
    bubble.className = `max-w-xl p-4 rounded-2xl shadow-sm ${sender === 'user'
        ? 'bg-blue-600 text-white rounded-br-none'
        : 'bg-white text-gray-800 rounded-bl-none'
        }`;
    bubble.innerHTML = marked.parse(html);

    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(bubble);
    container.appendChild(messageWrapper);

    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';
    container.style.marginBottom = '10px';

    chatWindow.appendChild(container);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}