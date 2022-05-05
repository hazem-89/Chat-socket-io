import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

export interface ISocketContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
  localUsernameData?: string;
  message?: string;
}
const socket = io(SOCKET_URL);
const SocketContext = createContext<ISocketContext>({
  socket,
  setUsername: () => false,
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

  return (
    <SocketContext.Provider
    value={{socket, username, setUsername, localUsernameData, message}}
    {...props}
  />
  )
}

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;