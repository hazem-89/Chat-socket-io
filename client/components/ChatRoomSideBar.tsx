import React, { CSSProperties, useState } from 'react'
import { useSockets } from '../context/socket.context';
import AddNewRoom from './AddNewRoom';

 const ChatRoomSideBar = () => {
  const { localUsernameData } = useSockets();
 const [isAddNewRoomOpen, setIsAddNewRoomOpen] = useState(false);

  return (
    <div style={sidebar}>
        {localUsernameData ? <h3>{localUsernameData}</h3> : <div>username</div>}
        <h4 style={rooms}>Name of current room</h4>
        <h4 style={rooms}>Name of another open room</h4>
        <h4 style={rooms}>Name of another open room</h4>

        <button style={btn} onClick={() => setIsAddNewRoomOpen(true)}>+</button>

    <AddNewRoom
        open={isAddNewRoomOpen}
        onClose={() => setIsAddNewRoomOpen(false)}
      ></AddNewRoom>
    </div>
  )
}
const btn: CSSProperties = {
    height: '3.5rem',
  width: '3.5rem',
  borderRadius: '100%',
  position: 'fixed',
  zIndex: 100,
  marginLeft: '50px',
  fontSize: '2.5rem',
  color: '#333',
}

const sidebar: CSSProperties = {
  margin: '0',
  padding: '0',
  width: '180px',
  backgroundColor: '#777',
  position: 'fixed',
  height: '100%',
  overflow: 'auto',
}

const rooms: CSSProperties = {
  display: "flex",
  color: '#333',
  padding: '16px',
  textDecoration: 'none'
}

export default ChatRoomSideBar;