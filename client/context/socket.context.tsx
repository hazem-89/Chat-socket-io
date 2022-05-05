
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
  setUsername: Function;
  localUsernameData?: string;
  message?: string;
  sendMessage: Function;

}
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(SOCKET_URL);

const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,
  sendMessage: () => '',
});

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState("");
  const [localUsernameData, setLocalUsernameData] = useState("")
  const [message, setMessage] = useState("")

  socket.on('message', message =>{
      setMessage(message)
  })
  
  useEffect(() => {
    setLocalUsernameData(localStorage.getItem("username"))
}, []);  

  


  useEffect(() => {
    socket.on('welcome', (data) => {
      console.log(data, socket.id);

      socket.on('connected', (username) => {
        console.log(username);
      });
    });
  }, []);

  socket.on('connect_error', (err) => {
    console.log('ogiltigt användarnamn');
  });

  const sendMessage = (message: string) => {
    socket.emit('chat-message', (message) => {
      console.log('here is ' + message);
    });
  };

  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, sendMessage, message }}
      {...props}
    />
  );
};


export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
