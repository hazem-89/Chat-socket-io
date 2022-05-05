import { SocketOptions } from "dgram";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import logger from "./utils/logo";

const EVENTS = {
  connection: "connection",
};

export function socket({ io }: { io: Server }) {
  logger.info("Socket connected");

  io.on("EVENTS.connection", (socket: Socket) => {
    logger.info("User is connected ${socket.id}");
  });

  //   // Create a new room
  //   io.of("/").on("create-room", (room) => {
  //     logger.info(`Room ${room} has been created`);
  //   });

  //   // Join a room
  //   io.of("/").on("join-room", (room, id) => {
  //     logger.info(`socket ${id} has joined the room ${room}`);
  //   });

  //   // Leave a room
  //   io.of("/").on("leave-room", (room, id) => {
  //     logger.info(`socket ${id} has left the ${room} room`);
  //   });

  //   // Delete a room
  //   io.of("/").on("delete-room", (room) => {
  //     logger.info(`Room ${room} has been deleted`);
  //   });
}

export default socket;
