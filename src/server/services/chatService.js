const axios = require('axios');
const readline = require('readline');

const OLLAMA_API_URL = process.env.OLLAMA_API_URL;

let isProcessing = false;
let chatQueue = [];
let runningRequests = {};

async function processOllamaModel(message, onChunk, signal) {
  try {
    const response = await axios.post(
      OLLAMA_API_URL,
      {
        model: "deepseek-r1:1.5b",
        prompt: message,
        stream: true
      },
      { responseType: 'stream', signal }
    );

    const rl = readline.createInterface({
      input: response.data,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (line.trim()) {
        try {
          const jsonData = JSON.parse(line);
          onChunk(jsonData.response);
        } catch (err) {
          console.error("Error parsing chunk:", err);
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      console.log("Model request was aborted by the user.");
      // Optionally, you could send a message back here if desired.
    } else {
      console.error("Error calling Ollama API:", error);
      onChunk("Error generating response.");
    }
    throw error;
  }
}

async function processQueue() {
  if (isProcessing || chatQueue.length === 0) return;
  isProcessing = true;
  const { socket, message } = chatQueue.shift();
  socket.emit('chat response', { chunk: '[STREAM_START]' });
  
  const controller = new AbortController();
  runningRequests[socket.id] = controller;

  try {
    await processOllamaModel(message, (chunk) => {
      socket.emit('chat response', { chunk });
    }, controller.signal);
  } catch (error) {
    // If the error was due to aborting, no further action is needed.
  }
  
  delete runningRequests[socket.id];
  socket.emit('chat response', { chunk: '[STREAM_END]' });
  isProcessing = false;
  if (chatQueue.length > 0) {
    processQueue();
  }
}

function addToQueue(socket, message) {
  chatQueue.push({ socket, message });
  processQueue();
}

function removeFromQueue(socketId) {
  chatQueue = chatQueue.filter(item => item.socket.id !== socketId);
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
  stopProcessing
};