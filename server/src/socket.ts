import { Server, Socket } from 'socket.io';
import logger from './utils/logo';

const EVENTS = {
  connection: 'connection',
};

function socket({ io }: { io: Server }) {
  logger.info('Socket connected');

  io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    
    socket.data.username = username;
    next();
  });

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User is connected ${socket.id}`);

    socket.emit('welcome', `welcome new user!`);

    socket.emit('connected', socket.data.username);

    socket.on('chat-message', (message) => {
      console.log(message);
      // io.emit('chat message', message);
    });

    // socket.on('send-message', (message) => {});
  });
}

export default socket;
