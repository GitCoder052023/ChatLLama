const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.redirect('/login'));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'auth/login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'auth/signup.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'views', 'chat.html')));

app.listen(PORT, () => {
  console.log(`Frontend Express server running on port ${PORT}`);
});
