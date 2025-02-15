# ChatLLama

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENCE.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Contributors](https://img.shields.io/github/contributors/GitCoder052023/ChatLLama.svg)](https://github.com/GitCoder052023/ChatLLama/graphs/contributors)
[![Node Version](https://img.shields.io/badge/node-v14+-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-supported-brightgreen.svg)](https://www.mongodb.com/)
[![WebSockets](https://img.shields.io/badge/WebSockets-enabled-blue.svg)](https://socket.io/)

Welcome to **ChatLLama**, a modern real-time chat application that leverages local Ollama models to deliver an interactive AI-based messaging experience. With secure user authentication, a responsive UI built with Tailwind CSS, and seamless communication via Socket.io, ChatLLama empowers you to communicate in real time while interacting with an intelligent local AI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Tags](#tags)

---

## Features

- **Real-Time Messaging:** Engage in interactive conversations powered by Socket.io.
- **Local AI Integration:** Chat with local Ollama models for intelligent responses.
- **User Authentication:** Secure sign-up and login with password hashing using bcrypt.
- **Responsive Design:** Modern UI built with Tailwind CSS and customizable with FontAwesome.
- **Database Integration:** Store user data securely in MongoDB.
- **Streamed Chat Responses:** Enjoy smooth, interactive streaming responses as you chat.

---

## Tech Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript (ES6+), Socket.io client
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** bcrypt
- **Real-Time Communication:** Socket.io
- **AI Integration:** Local Ollama Models

---

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (running instance)
- [npm](https://www.npmjs.com/)

---

## Database Setup

To set up MongoDB for ChatLLama, follow these steps:

1. **Install and Start MongoDB:**
   - Download and install MongoDB from the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
   - Start the MongoDB service on your machine.

2. **Create the Database and Collection:**
   - Open your terminal and run the Mongo shell by typing:
     ```
     mongo
     ```
   - Switch to (or create) a database named `ChatLLama`:
     ```
     use ChatLLama
     ```
   - Create an empty collection named `users`:
     ```
     db.createCollection("users")
     ```
   - Verify the collection has been created:
     ```
     show collections
     ```

This configuration ensures that ChatLLama will use the `ChatLLama` database and store user data in the `users` collection.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/GitCoder052023/ChatLLama.git
   cd ChatLLama
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   - Create a `.env` file in the root directory.
   - The application automatically updates the `FRONTEND_ORIGIN` based on your local IP address.
   - Define your `OLLAMA_API_URL` (pointing to your Ollama API endpoint). For example:
     ```
     OLLAMA_API_URL=http://localhost:11434
     ```

4. **Run the Application:**

   To start both the frontend and backend servers concurrently:
   
   ```bash
   npm run dev
   ```

   - The frontend server typically runs at [http://localhost:3001](http://localhost:3001).
   - The backend server runs at [http://localhost:5000](http://localhost:5000).

---

## Usage

1. **User Registration:**
   - Visit the Sign-Up page and create a new account (ensure your email ends with `@gmail.com` as required).
   
2. **Login:**
   - Sign in with your registered credentials. You will be redirected to the chat interface upon successful login.
   
3. **Chat:**
   - Start a conversation by sending messages. Enjoy real-time, streaming AI responses.
   
4. **Logout:**
   - Log out securely via the profile popup.

---

## Contributing

We welcome contributions to enhance ChatLLama! Here's how you can help:

1. Fork the repository and create a feature/bugfix branch.
2. Follow the existing code style and add tests as needed.
3. Write clear, descriptive commit messages.
4. Submit a pull request and reference any related issues.

Please review our [CONTRIBUTING Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENCE.md) file.

---

## Contact

For questions, support, or further information, please contact us at [contact.khub.dev@gmail.com](mailto:contact.khub.dev@gmail.com).