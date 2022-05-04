import { useSockets } from "../context/socket.context";
import UserInputComponent from "../components/userInputComponent";
import {Rooms} from "../components/Rooms";
import { useRef } from "react";
import {ISocketContext }from "../context/socket.context"


export default function Home() {
  const {socket, username, setUsername} = useSockets();
  const usernameRef = useRef(null)

  return (
  <div>
    {!username && (
      <div>
        <UserInputComponent />
      </div>
    )}
    {username && (
        <div >
          <Rooms />
        </div>
      )}
  </div>
  )
}


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(<App />);
