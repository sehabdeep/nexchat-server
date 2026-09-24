const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.get('/', (req,res)=> res.send('NexChat LIVE'));
io.on('connection', (socket)=>{
  socket.on('send_message', (data)=>{
    socket.broadcast.emit('receive_message', data);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log('ON'));
