import { Server, Socket } from "socket.io";
import logger from "./utils/logo";
import { getRooms } from "./roomStore";

const EVENTS = {
  connection: "connection",
};

function socket({ io }: { io: Server }) {
  logger.info("Socket connected");

  io.use((socket: Socket, next) => {
    const username: string = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }

    socket.data.username = username;
    next();
  });

  //   io.use((socket: Socket, next) => {
  //   const currentRoom: string = socket.handshake.auth.currentRoom;
  //   if (!currentRoom || currentRoom === "") {
  //     return next(new Error("Invalid room name"));
  //   }
  //   socket.data.currentRoom = currentRoom;
  //   next();
  // });

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User is connected ${socket.id}`);

    socket.emit("welcome", `welcome new user!`);

    socket.emit("connected", socket.data.username);

    socket.on("chat-message", (message) => {
      console.log(message);
      io.emit("chat message", message);
    });

    socket.on("join", (room) => {
      const shouldBroadcastRooms: boolean = !getRooms(io).includes(room);
      console.log(getRooms(io).includes(room));

      socket.join(room);

      if (shouldBroadcastRooms) {
        io.emit("roomList", getRooms(io));
      }

      socket.emit("joined", room);
      //socket.data.currentRoom = room;
    });

    // io.emit('chat message', message);
  });

  // socket.on('send-message', (message) => {});
}

export default socket;
