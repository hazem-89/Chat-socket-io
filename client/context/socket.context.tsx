import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import { ServerToClientEvents, ClientToServerEvents, ServerSocketData } from '../../server/types';

/**
 * rooms lista
 * nuvarande rum
 * chatthistorik i lista
 * chatt: content, isSelf, user
 *
 */

export interface ISocketContext {
  socket: Socket;
  username?: string;
  //rooms: string[];
  currentRoom: string;
  //chatHistory: string[];
  setUsername: Function;
  createRoom: Function;
  sendMessage: Function;
}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,
  sendMessage: () => false,
  createRoom: () => false,
  currentRoom: ''

});

socket.on("roomList", (rooms) => {
  console.log(rooms);
})

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  //const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    /* socket.connect() */
    socket.on('welcome', (data) => {
      console.log(data, socket.id);
    });
    
    socket.on('connected', (username) => {
      console.log(username);
    });

    socket.on("roomList", (rooms) => {
      console.log(rooms)
    })

    socket.on("joined", (room) => {
      console.log("Joined room: ", room)
    })
    
  }, []);

  socket.on('connect_error', (err) => {
    console.log(err)
    console.log('ogiltigt användarnamn');
  });

  const sendMessage = (message: string) => {
    socket.emit('chat-message', (message) => {
      console.log('here is ' + message);
    });
  };

  socket.on('left', (room) => {
    console.log('Left room: ', room)
  });



  let joinedRoom: string;

  const createRoom = (room) => {
    joinedRoom = room;
    console.log("join", room);
    socket.emit('join', room);
    setCurrentRoom(room);
    return;
  }

  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, sendMessage, createRoom, currentRoom, setCurrentRoom: joinedRoom }}
      {...props}
    />
  )
}

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
