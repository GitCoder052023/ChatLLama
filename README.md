# ChatLLama

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/GitCoder052023/ChatLLama)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENCE.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](package.json)
[![Contributors](https://img.shields.io/badge/contributors-1-orange)](https://github.com/GitCoder052023/ChatLLama/graphs/contributors)

ChatLLama is a modern, real-time chat application that leverages local Ollama models to deliver an interactive AI-based messaging experience. It offers secure user authentication, responsive design built with Tailwind CSS, and seamless communication via Socket.io.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Real-Time Messaging:** Engage in interactive conversations powered by Socket.io.
- **Local AI Integration:** Chat with your local Ollama models for smart responses.
- **User Authentication:** Secure sign-up and login using bcrypt for password hashing.
- **Responsive UI:** Modern interface built with Tailwind CSS and FontAwesome.
- **Database Integration:** Store user data with MongoDB.
- **Streamed Chat Responses:** Enjoy smooth, interactive streaming responses in your chats.

---

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (Ensure you have a running MongoDB instance)
- [npm](https://www.npmjs.com/)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GitCoder052023/ChatLLama.git
   cd ChatLLama
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - The application automatically updates the `FRONTEND_ORIGIN` in the `.env` file based on your local IP address.  
   - Ensure you set the `OLLAMA_API_URL` variable to point to your Ollama API endpoint.

4. **Run the application:**

   To start both the frontend and backend servers simultaneously:

   ```bash
   npm run dev
   ```

   - The frontend server will typically run on [http://localhost:3001](http://localhost:3001).
   - The backend server runs on port `5000` by default.

---

## Usage

1. **User Registration:**
   - Navigate to the Sign-Up page to create a new account.
   - Provide valid credentials to register.

2. **Login:**
   - Use your registered credentials to sign in.
   - After login, you will be redirected to the chat interface.

3. **Chat:**
   - Send messages to interact with the local Ollama model.
   - Enjoy real-time, streamed responses as the model processes your inputs.

4. **Logout:**
   - Click on the logout button to securely exit your session.

---

## Contributing

We welcome contributions to improve ChatLLama! For details on our code standards, bug reporting, and pull request process, please see our [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

This project is licensed under the MIT License - see the [LICENCE.md](LICENCE.md) file for details.

---

## Contact

For any questions or support, please contact us at [contact.khub.dev@gmail.com](contact.khub.dev@gmail.com).

Happy chatting!