# ChatLLama

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Contributors](https://img.shields.io/github/contributors/GitCoder052023/ChatLLama.svg)](https://github.com/GitCoder052023/ChatLLama/graphs/contributors)
[![Node Version](https://img.shields.io/badge/node-v14+-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-supported-brightgreen.svg)](https://www.mongodb.com/)
[![WebSockets](https://img.shields.io/badge/WebSockets-enabled-blue.svg)](https://socket.io/)

Welcome to **ChatLLama**, a modern real-time chat application that leverages local Ollama models for an interactive AI-based messaging experience. ChatLLama provides secure user authentication, a responsive UI styled with Tailwind CSS, and seamless communication through Socket.io. Whether you're looking to chat with an intelligent AI or interact with friends, ChatLLama offers a robust and dynamic platform for real-time conversations.

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

---

## Features

- **Real-Time Messaging:** Engage in dynamic, live conversations enabled by Socket.io with smooth, streaming chat responses.
- **Local AI Integration:** Interact with local Ollama models that process your messages and deliver intelligent, streamed responses.
- **Secure User Authentication:** Register and log in safely with bcrypt-based password hashing and Gmail address verification.
- **Responsive & Modern UI:** Experience a sleek interface built with Tailwind CSS and enhanced with FontAwesome icons.
- **Robust Database Integration:** All user data is securely stored in a MongoDB database.
- **Dynamic Environment Configuration:** Automatically configures environment variables such as FRONTEND_ORIGIN based on your local IP.

---

## Tech Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript (ES6+), EJS, Socket.io client
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
- Local Ollama API (e.g., running at http://localhost:11434)

---

## Database Setup

To set up MongoDB for ChatLLama:

1. **Install and Start MongoDB:**
   - Download and install MongoDB from the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
   - Start the MongoDB service on your machine.

2. **Create the Database and Collection:**
   - Open your terminal and run the Mongo shell:
     ```
     mongo
     ```
   - Switch to (or create) the `ChatLLama` database:
     ```
     use ChatLLama
     ```
   - Create the `users` collection:
     ```
     db.createCollection("users")
     ```
   - Verify that the collection was created:
     ```
     show collections
     ```

---

## Installation

1. **Clone the Repository:**

   ```
   git clone https://github.com/GitCoder052023/ChatLLama.git
   cd ChatLLama
   ```

2. **Install Dependencies:**

   ```
   npm install
   ```

3. **Set Up Environment Variables:**

   - Create a `.env` file in the root directory.
   - Add at least the following variable (the app auto-updates additional variables on startup):
     ```
     OLLAMA_API_URL=http://localhost:11434
     ```

4. **Run the Application:**

   To start the frontend, backend, and Tailwind CSS build concurrently, run:

   ```
   npm run dev
   ```

   - The frontend server runs at [http://localhost:3001](http://localhost:3001).
   - The backend server runs at [http://localhost:5000](http://localhost:5000).

---

## Usage

1. **User Registration:**
   - Navigate to the Sign-Up page.
   - Register a new account (please ensure your email ends with `@gmail.com` as required).

2. **Login:**
   - Sign into your account to access the chat interface.

3. **Chat:**
   - Use the intuitive chat interface to send messages and receive streaming responses from the local AI.
   - Enjoy real-time updates via Socket.io.

4. **Logout:**
   - Log out securely using the profile menu.

---

## Contributing

We welcome contributions to make ChatLLama even better! To contribute:

1. Fork the repository and create a feature or bugfix branch.
2. Adhere to the existing code style and conventions.
3. Ensure your changes do not break existing functionality.
4. Submit a pull request with clear commit messages and reference any related issues.

For further details, please review [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE.md) for more information.

---

## Contact

For questions, support, or further inquiries, please contact us at [contact.khub.dev@gmail.com](mailto:contact.khub.dev@gmail.com).