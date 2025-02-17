export function initializeSocketEvents(socket, { chatWindow, sendButton, chatInput }, appendMessage) {
    let currentResponse = '';
    let currentTypingElem = null;
    let streaming = false;
    let currentModel = null;

    socket.on('chat response', (data) => {
        const chunk = data.chunk;
        if (chunk === '[STREAM_START]') {
            currentResponse = '';
            currentModel = data.model || '';
            currentTypingElem = createTypingIndicator();
            chatWindow.appendChild(currentTypingElem);
            chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
            streaming = true;
            sendButton.innerHTML = '<i class="fas fa-stop text-lg"></i>';
            chatInput.required = false;
        } else if (chunk === '[STREAM_END]') {
            if (currentTypingElem) {
                chatWindow.removeChild(currentTypingElem);
                currentTypingElem = null;
            }
            appendMessage(currentResponse, 'bot', currentModel);
            currentResponse = '';
            currentModel = null;
            streaming = false;
            sendButton.innerHTML = '<i class="fas fa-paper-plane text-lg"></i>';
            chatInput.required = true;
        } else {
            currentResponse += chunk;
            if (currentTypingElem) {
                const bubble = currentTypingElem.querySelector('.max-w-xl');
                bubble.innerHTML = marked.parse(currentResponse);
            } else {
                appendMessage(chunk, 'bot', currentModel);
            }
        }
    });

    function createTypingIndicator() {
        const container = document.createElement('div');
        container.className = 'message-container flex flex-col';

        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'flex gap-3 flex-row';

        const avatar = document.createElement('div');
        avatar.className = 'w-9 h-9 flex items-center justify-center rounded-xl bg-gray-200';
        avatar.innerHTML = '<i class="fas fa-robot text-gray-600 text-lg"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'max-w-xl p-4 rounded-2xl shadow-sm bg-white text-gray-800 rounded-bl-none';
        bubble.innerHTML = `<div class="typing-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>`;

        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(bubble);
        container.appendChild(messageWrapper);
        return container;
    }

    function forceStop() {
        if (currentTypingElem) {
            chatWindow.removeChild(currentTypingElem);
            currentTypingElem = null;
        }
        currentResponse = '';
        streaming = false;
        sendButton.innerHTML = '<i class="fas fa-paper-plane text-lg"></i>';
        chatInput.required = true;
    }

    return {
        get isStreaming() {
            return streaming;
        },
        forceStop
    };
}