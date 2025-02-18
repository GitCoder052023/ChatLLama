export function appendMessage(html, sender = 'bot', modelName = '') {
    const chatWindow = document.getElementById('chat-window');
    const container = document.createElement('div');
    container.className = 'message-container flex flex-col w-full mb-4';

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const bubble = document.createElement('div');
    bubble.className = `max-w-2xl p-4 rounded-2xl ${
        sender === 'user'
            ? 'bg-[#e8eef6] text-black rounded-br-md'
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
    }`;
    bubble.innerHTML = marked.parse(html);

    messageWrapper.appendChild(bubble);
    container.appendChild(messageWrapper);

    if (sender === 'bot' && modelName) {
        const modelLabel = document.createElement('div');
        modelLabel.className = 'text-xs text-gray-500 mt-1 ml-2';
        modelLabel.textContent = modelName;
    }

    chatWindow.appendChild(container);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}
