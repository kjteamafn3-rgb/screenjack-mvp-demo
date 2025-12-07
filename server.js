const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('.'));

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('rain-request', () => {
    io.emit('rain', { amount: Math.floor(Math.random() * 100000) + 50000 });
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server on port ${PORT}`));