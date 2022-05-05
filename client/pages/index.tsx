import { useSockets } from '../context/socket.context';
import UserInputComponent from '../components/userInputComponent';
import { Rooms } from '../components/Rooms';
import { CSSProperties, useRef, useState } from 'react';
import { ISocketContext } from '../context/socket.context';
import ChatRoom from '../components/ChatRoom'
import ChatRoomSideBar from '../components/ChatRoomSideBar';

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);
  const [isInputOpen, setIsInputOpen] = useState(true);
  
  return (
    <div style={rootstyle}>
      <ChatRoomSideBar/>
      {!username ? (
        <div style={usernameInputDivStyle}>
          <UserInputComponent />
        </div>
      ) : (
        null
      )}
      <ChatRoom/>
    </div>
  );
}

const rootstyle: CSSProperties = {
  width: '100%',
  height: '100vh',
  // border: '2px solid blue',
};

const usernameInputDivStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  height: "100vh",
  width: "100%",
  background: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(<App />);
