import { Server } from "socket.io";

export function getRooms(io: Server) {
  const rooms = [];
  console.log(io.sockets.adapter.rooms);
  for (let [id, socket] of io.sockets.adapter.rooms) {
    if (!socket.has(id)) {
      rooms.push(id);
    }
  }
  return rooms;
}
export default getRooms;
