const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('.'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('rain-request', () => {
    io.emit('rain', { amount: Math.floor(Math.random() * 100000) + 50000 });
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server on port ${PORT}`));