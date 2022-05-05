import React, { CSSProperties, useState } from 'react';
import AddNewRoom from './AddNewRoom';
//import { Icon } from '@iconify/react';
import { useSockets } from '../context/socket.context';

const ChatRoomSideBar = () => {
  const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);
  const { setUsername } = useSockets();


  const handleOnLogOut = () => {
    localStorage.removeItem('user');
    setUsername(null)
  }

  return (
    <div style={sidebar}>
      <div>
        <h4 style={rooms}>Name of current room</h4>
        <h4 style={rooms}>Name of another open room</h4>
        <h4 style={rooms}>Name of another open room</h4>

        <button style={btn} onClick={() => setIsAddNewRoomOpen(true)}>
          +
        </button>
        </div>
        <AddNewRoom
          open={isAddNewRoomOpen}
          onClose={() => setIsAddNewRoomOpen(false)}
        ></AddNewRoom>
      
      <button 
      className="button" 
      style={{marginBottom: "1rem"}}
      onClick={handleOnLogOut}>
    {/*     <Icon icon="bx:log-out" /> */}
      </button>
    </div>
  );
};
const btn: CSSProperties = {
  height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  marginLeft: '50px',
  fontSize: '2.5rem',
  color: '#333',
};

const sidebar: CSSProperties = {
  margin: '0',
  padding: '0',
  width: '180px', //om ändras måste även margin left i ChatRoom ändras
  backgroundColor: '#777',
  position: 'absolute',
  bottom: 0,
  height: '100%',
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center"
   
};

const rooms: CSSProperties = {
  display: 'flex',
  color: '#333',
  padding: '16px',
  textDecoration: 'none',
};

export default ChatRoomSideBar;
