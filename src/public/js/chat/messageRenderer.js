export function appendMessage(html, sender = 'bot', modelName = '') {
    const chatWindow = document.getElementById('chat-window');
    const container = document.createElement('div');
    container.className = 'message-container flex flex-col w-full';

    if (sender === 'bot' && modelName) {
        const modelLabel = document.createElement('div');
        modelLabel.className = 'model-label text-sm text-gray-500 mb-1 ml-12';
        modelLabel.textContent = modelName;
        container.appendChild(modelLabel);
    }

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex gap-3 ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`;

    const avatar = document.createElement('div');
    avatar.className = 'w-9 h-9 flex items-center justify-center rounded-xl';

    if (sender === 'user') {
        const username = localStorage.getItem('username') || 'User';
        avatar.style.backgroundColor = stringToColor(username);
        avatar.textContent = getInitials(username);
        avatar.style.color = 'white';
        avatar.style.fontSize = '0.875rem';
    } else {
        avatar.classList.add('bg-gray-200');
        avatar.innerHTML = '<i class="fas fa-robot text-gray-600 text-lg"></i>';
    }

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

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}

function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
}