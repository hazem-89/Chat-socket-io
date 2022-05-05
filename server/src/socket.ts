import { Server, Socket } from "socket.io";
import { getRooms } from "./roomStore";
import logger from "./utils/logo";

const EVENTS = {
  connection: "connection",
};

export function socket({ io }: { io: Server }) {
  logger.info("Socket connected");

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User is connected ${socket.id}`);

    socket.on("chat message", (message) => {
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
    });
  });
}

export default socket;
