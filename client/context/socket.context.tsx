import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

export interface ISocketContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
}
const socket = io(SOCKET_URL, );
const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,

});

// useEffect(() =>  {
//   socket.connect();
// }, [])


const SocketProvider = (props: any) => {
  const [username, setUsername] = useState("");



  return (
    <SocketContext.Provider
    value={{socket, username, setUsername}}
    {...props}
  />
  )
}

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;