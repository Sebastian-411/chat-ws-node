import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();

const server = createServer(app)
const io = new Server(server)

io.on('connection', () => {
  console.log('user connected');
})


app.use(logger('dev'))

app.use(express.static(process.cwd() + "/client/"));

io.on('connection', (socket) => {
  console.log('a user connected')

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
