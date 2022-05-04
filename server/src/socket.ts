import { Server, Socket } from "socket.io";
import logger from "./utils/logo";

const EVENTS = {
  connection: "connection",
}

function socket({io}: {io: Server}) {
  logger.info("Socket connected")

  io.on("EVENTS.connection", (socket: Socket) => {
    logger.info("User is connected ${socket.id}")
  })
}

export default socket;