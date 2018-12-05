import openSocket from 'socket.io-client';
const  socket = openSocket('http://ec2-18-224-149-92.us-east-2.compute.amazonaws.com');

function sendToScreen(product) {
  socket.emit('send-to-screen', product);
}

function receiveMessage(cb) {
  socket.on('receive-message', p => cb(null, p));
}

function notifySender() {
	socket.emit('notify-sender', 'ping');
}

function receiveMessageLoop(cb) {
  socket.on('receive-message-loop', cb(null));
}

export { sendToScreen, receiveMessage, receiveMessageLoop, notifySender };