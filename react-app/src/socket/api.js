import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-18-224-153-166.us-east-2.compute.amazonaws.com');

function sendToScreen(product) {
  socket.emit('send-to-screen', product);
}

function receiveMessage(cb) {
  socket.on('receive-message', p => cb(null, p));
}

export { sendToScreen, receiveMessage };