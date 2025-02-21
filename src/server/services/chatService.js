const axios = require('axios');
const readline = require('readline');

const OLLAMA_API_URL = process.env.OLLAMA_API_URL;

let isProcessing = false;
let chatQueue = [];
let runningRequests = {};
let chatHistories = {};

async function processOllamaModel(model, messages, onChunk, signal) {
  try {
    const response = await axios.post(
      `${OLLAMA_API_URL}/api/chat`,
      {
        model: model,
        messages: messages,
        stream: true
      },
      { responseType: 'stream', signal }
    );

    const rl = readline.createInterface({
      input: response.data,
      crlfDelay: Infinity
    });

    let fullResponse = '';
    let isThinking = false;

    for await (const line of rl) {
      if (line.trim()) {
        try {
          const jsonData = JSON.parse(line);
          if (jsonData.message?.content) {
            const chunk = jsonData.message.content;

            if (chunk.includes('<think>')) {
              isThinking = true;
              onChunk(`<think>${chunk.replace('<think>', '')}`);
              continue;
            }

            if (chunk.includes('</think>')) {
              isThinking = false;
              onChunk(`${chunk.replace('</think>', '')}</think>`); 
              continue;
            }

            if (isThinking) {
              onChunk(`<think>${chunk}</think>`); 
              continue;
            }

            fullResponse += chunk;
            onChunk(chunk);
          }
        } catch (err) {
          console.error("Error parsing chunk:", err);
        }
      }
    }
    return fullResponse;
  } catch (error) {
    if (error.name !== 'AbortError' && error.code !== 'ERR_CANCELED') {
      console.error("Error calling Ollama API:", error);
      onChunk("Error generating response.");
    }
    throw error;
  }
}

async function processQueue() {
  if (isProcessing || chatQueue.length === 0) return;
  isProcessing = true;

  const { socket, message, model } = chatQueue.shift();

  if (!chatHistories[socket.id]) {
    chatHistories[socket.id] = [];
  }

  chatHistories[socket.id].push({ role: 'user', content: message });

  socket.emit('chat response', { chunk: '[STREAM_START]', model });

  const controller = new AbortController();
  runningRequests[socket.id] = controller;

  try {
    const fullResponse = await processOllamaModel(
      model,
      [...chatHistories[socket.id]],
      (chunk) => socket.emit('chat response', { chunk }),
      controller.signal
    );

    chatHistories[socket.id].push({ role: 'assistant', content: fullResponse });
  } catch (error) {
    chatHistories[socket.id].pop();
  } finally {
    delete runningRequests[socket.id];
    socket.emit('chat response', { chunk: '[STREAM_END]' });
    isProcessing = false;
    if (chatQueue.length > 0) processQueue();
  }
}

function addToQueue(socket, message, model) {
  chatQueue.push({ socket, message, model });
  processQueue();
}

function resetChatHistory(socketId) {
  delete chatHistories[socketId];
}

function removeFromQueue(socketId) {
  chatQueue = chatQueue.filter(item => item.socket.id !== socketId);
  resetChatHistory(socketId);
}

function stopProcessing(socket) {
  if (runningRequests[socket.id]) {
    runningRequests[socket.id].abort();
    delete runningRequests[socket.id];
  }
}

module.exports = {
  addToQueue,
  removeFromQueue,
  stopProcessing,
  resetChatHistory
};