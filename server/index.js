import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();

const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})


app.use(logger('dev'))

app.use(express.static(process.cwd() + "/client/style"));
app.use(express.static(process.cwd() + "/client/script"));


io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
  console.log(`Started at ${port}`);
});
