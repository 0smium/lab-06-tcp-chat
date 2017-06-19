'use strict';

const net = require('net');
const server =  net.createServer();

let clientPool = [];
let conNum = 1;
let currentUsers = [];

server.on('connection', (socket) => {

  socket.nickname = `user_` + conNum;
  conNum = conNum + 1;
  socket.write('Hello ' + socket.nickname + ', welcome to steve-chat!\n');
  console.log(`${socket.nickname} connected!`);

  clientPool = [...clientPool, socket];

  currentUsers = [];
  for (var i = 0; i < clientPool.length; i++) {
    currentUsers.push(clientPool[i].nickname);
  }

  if (currentUsers.length === 1) {
    socket.write(socket.nickname + ', you are the only user connected.');
  } else {
    socket.write(clientPool.length + ' users are currentlly connected: ' + currentUsers.join(', ') + '.\n');
  }

  let handleDisconnect = () => {
    console.log(`${socket.nickname} left the chat`);
    clientPool = clientPool.filter(item => item !== socket);
  };

  // console.log('socket: ' + socket);
  // console.log('nickname: ' + socket.nickname);

  socket.on('error', handleDisconnect);
  socket.on('close', handleDisconnect);

});


server.listen(3000, () => {
  console.log('server running on port 3000');
});
