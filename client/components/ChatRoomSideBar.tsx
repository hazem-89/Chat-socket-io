import React, { CSSProperties, useState } from 'react'

 const ChatRoomSideBar = () => {
 const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  return (
    <div style={sidebar}>
        <h4 style={rooms}>Name of current room</h4>
        <h4 style={rooms}>Name of another open room</h4>
        <h4 style={rooms}>Name of another open room</h4>

        <button style={btn} onClick={() => setIsNewPostOpen(true)}>+</button>
    
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
  color: '#fff',
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