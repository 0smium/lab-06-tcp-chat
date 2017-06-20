'use strict';

const net = require('net');
const server =  net.createServer();

let clientPool = [];
let conNum = 1;
let currentUsers = [];

var updateCurrentUsers = () => {
  currentUsers = [];
  for (var i = 0; i < clientPool.length; i++) {
    currentUsers.push(clientPool[i].nickname);
    if(currentUsers.length > 1)
      console.log(currentUsers.join(', ') + ' now logged in');
  }
};

const User = function(socket) {
  this.nickname =  socket.nickname = `user_` + conNum;
  this.socket = socket;
};

server.on('connection', (socket) => {

  let user = new User(socket);
  conNum = conNum + 1;
  clientPool.forEach((item) => {
    item.write(`${user.nickname} just joined.\n`);
  });
  socket.write('Hello ' + user.nickname + ', welcome to steve-chat!\n');
  console.log(`${user.nickname} connected!`);

  clientPool = [...clientPool, user.socket];
  updateCurrentUsers();

  if (currentUsers.length === 1) {
    socket.write(user.nickname + ', you are the only user connected.\n');
  } else {
    socket.write(clientPool.length + ' users are currentlly connected: ' + currentUsers.join(', ') + '.\n');
  }

  let handleDisconnect = () => {
    console.log(`${user.nickname} left the chat.`);
    clientPool = clientPool.filter(item => item !== user.socket);
  };

  socket.on('error', handleDisconnect);
  socket.on('close', handleDisconnect);
  // socket.on('end', handleDisconnect);

  socket.on('data', (buffer) => {
    let data = buffer.toString();

    //Nickname functionality
    if(data.startsWith('/nick')){
      let nickname = null;
      let oldNickName = user.nickname;
      if(data.split('/nick ')[1]){
        nickname = (data.split('/nick ')[1]).trim();
      } else {
        socket.write('You did not enter a nickname.\n');
      }
      if (currentUsers.indexOf(nickname) == -1) {
        user.nickname = socket.nickname = nickname;
        socket.write(`you are now know as ${user.nickname}.\n`);
        updateCurrentUsers();
        if (user.nickname !== oldNickName) {
          clientPool.forEach((item) => {
            item.write(`${oldNickName} just changed to ${user.nickname}.\n`);
          });
        }
      }
      else {
        if (nickname !== oldNickName) {
          socket.write(`That nickname is currently taken.  You are still ${user.nickname}.\n`);
        }
      }
      return;
    }
    // dm AKA direct message functionality
    if(data.startsWith('/dm')){
      let toUser = data.split(' ')[1];
      let message = data.split(' ').slice(2).join(' ');
      clientPool.forEach((item) => {
        if (toUser == item.nickname) {
          item.write(`${user.nickname}: ${message}`);
        }
      });
      return;
    }

    //Troll functionality
    if(data.startsWith('/troll')){
      let num = data.split(' ')[1];
      if (isNaN(num)) {
        socket.write('You did not enter a number as the first argument.\n');
      } else {
        let message = data.split(' ').slice(2).join(' ');
        clientPool.forEach((item) => {
          for (let i = 0; i < num; i++) {
            item.write(`${user.nickname}: ${message}`);
          }
        });
      }
      return;
    }

    //Global chat
    clientPool.forEach((item) => {
      item.write(`${user.nickname}: ${data}`);
    });

    //Quit functionality
    if(data.startsWith('/quit')){
      clientPool.forEach((item) => {
        item.write(`${user.nickname} left the chat.\n`);
      });
      socket.end();
    }
  });
});

server.listen(3000, () => {
  console.log('server running on port 3000');
});
