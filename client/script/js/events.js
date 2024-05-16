import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io()

const form = document.getElementById('form');
const input = document.getElementById('input');


const messages = document.getElementById('messages');

socket.on('chat message', msg => {
  const item = `<li>${msg}</li>`;
  messages.insertAdjacentHTML('beforeend', item);
})

socket.on('disconnect', (socket) => {
  console.log(socket)
  logMessage('disconnected')
})

function logMessage(msg) {
  log.insertAdjacentHTML('beforeend', `<p>${msg}</p>`);
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input.value) {
    console.log('anuel')
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
