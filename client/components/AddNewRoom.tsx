import React, { CSSProperties, FormEvent, useContext, useEffect, useRef, useState } from 'react'
//import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { useSockets } from '../context/socket.context';

export interface IAddNewRoomProps {
  selecor?: string;
  open: boolean;
  onClose: () => void;
}

const AddNewRoom = ({ open, onClose }) => {
  const [roomName, setRoomName] = useState<string>('');
  const [newRoom, setNewRoom] = useState({});
  //const navigate = useNavigate();
  const { username, socket, createRoom } = useSockets();
 

  const ref = useRef<Element>(null);

  useEffect(() => {
    ref.current = document.querySelector('.add-new-room')

    if (!ref.current) {
      const div = document.createElement('div');
      div.setAttribute('id', 'add-new-room');
      document.body.appendChild(div);
      ref.current = div;
    }
  }, []);


  if (!open) return null;

  const newRooms = (currentUser, roomName: string) => {
    setNewRoom({ currentUser, roomName });
    //navigate('/');
    return;
  };


  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRoomName(roomName)
    newRooms(username, roomName);
    const room = roomName;
    if (!room.length) {
      console.log('Ogiltigt namn på rum...');
      return;
    }
    
    createRoom(room);
    onClose(true);
    return;
  };

  const handleOnChange = (e) => {
    setRoomName(e.target.value);
  };


return ReactDOM.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>
            Create a new room
          </h2>
          <form onSubmit={handleOnSubmit}>
            <input
              style={{ width: '100%', height: '3rem', marginBottom: '1rem', fontSize: '1.5rem' }}
              type="text"
              value={roomName}
              onChange={handleOnChange}
              name="roomName"
              id="roomName"
              required
            />
            <button style={submitButtonStyle} type="submit">
              Done
            </button>
          </form>
        </div>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
      </div>
    </>,
    document.getElementById('add-new-room')!
  );
}

const modalStyles: CSSProperties = {
  position: 'fixed',
  top: '56%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#999',
  padding: '50px',
  zIndex: 1000,
  width: '30rem',
  borderRadius: '22px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const overlayStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000,
};

const closeButtonStyle: CSSProperties = {
  position: 'fixed',
  padding: '0',
  top: '10px',
  left: '5px',
  height: '2.5rem',
  width: '2.5rem',
  background: 'transparent',
  border: 'none',
};

const submitButtonStyle: CSSProperties = {
  height: '2.5rem',
  width: '5rem',
  color: 'white',
  backgroundColor: '#777',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.3rem',
};

export default AddNewRoom;