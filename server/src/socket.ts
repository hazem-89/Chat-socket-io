import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
}
const users = {};
function socket({io}: {io: Server}) {
  logger.info("Socket connected")

  io.on("connection", (socket) => {
    logger.info("User is connected")

   socket.emit("message", "Welcome to ChaTea")

   socket.broadcast.emit("message", "user has joined the chat")


   socket.on("disconnect", () => {
     io.emit("message", "User left the chat")
   })
  })
}

export default socket;