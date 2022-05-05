import ReactDOM from 'react-dom';
import { useState, CSSProperties, useEffect, useRef } from 'react';
import { useSockets } from '../context/socket.context';
import io, { Socket } from "socket.io-client";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const UserInputComponent = () => {
  const { message, setUsername } = useSockets();
  const [value, setValue] = useState<string>('');
  const parent = useRef<Element>();

//    const wrapper = document.body;
  useEffect(() => {
    parent.current = document.querySelector('.usernameInput');

    if (!parent.current) {
      const div = document.createElement('div');
      div.setAttribute('id', 'usernameInput');
      document.body.appendChild(div);
      parent.current = div;
    }
    // console.log(parent.current)
  }, []);

// console.log(parent.current)
  // const DOMdiv = document.getElementById('usernameInput')

  const handleOnChange = (e: any) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleOnSubmit = () => {
    setUsername(value);
    localStorage.setItem('username', value);
  };


  return (
    <>
      <div style={rootstyle}>
          <div className="welcom-msg">
               {message}
         <br/>
        <p>Choose your username:</p>
          </div>
        <form onSubmit={handleOnSubmit}>
          <input
            style={inputStyle}
            type="text"
            value={value}
            onChange={handleOnChange}
          >
          </input>
          <button className="button" type="submit">
            Done
          </button>
        </form>
      </div>
    </>
  );
};

const rootstyle: CSSProperties = {
  width: '30rem',
  height: '10rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};

const inputStyle: CSSProperties = {
  borderRadius: '100px',
  border: 'none',
  height: '2rem',
  width: '10rem',
  marginRight: '1rem',
  padding: '0.5em',
};

export default UserInputComponent;
