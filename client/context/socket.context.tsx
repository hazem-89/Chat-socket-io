import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { ServerToClientEvents, ClientToServerEvents } from '../../server/types'

export interface ISocketContext {
  socket: Socket;
  username?: string;
  //rooms: string[];
  //currentRoom: string;
  //chatHistory: string[];
  setUsername: Function;
  createRoom: Function;
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, );
const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,
  createRoom: () => false,


});

socket.on("roomList", (rooms) => {
  console.log(rooms);
})

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() =>  {
    socket.connect();

    socket.on("roomList", (rooms) => {
    //console.log(rooms)
    })

   socket.on("joined", (room) => {
      console.log("Joined room: ", room)
    })

  }, [])


  let joinedRoom: string;

    const createRoom = (room) => {
    joinedRoom = room;
    socket.emit('join', room);
    console.log(room);
    return;
  }

  return (
    <SocketContext.Provider
    value={{socket, username, setUsername, createRoom}}
    {...props}
  />
  )
}

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;