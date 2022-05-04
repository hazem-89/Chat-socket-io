import ReactDOM from 'react-dom'
import { useState, CSSProperties } from 'react'
import { useSockets } from '../context/socket.context';


const UserInputComponent = () => {
    const {username, setUsername} = useSockets();
    const [value, setValue] = useState<string>("");
    
    const handleOnChange = (e: any) => {
        console.log(e.target.value)
        setValue(e.target.value);
    }

    const handleOnSubmit = () => {
        setUsername(value);
        localStorage.setItem("username", value)
    }

    return (
        <div style={rootstyle}>
            <form onSubmit={handleOnSubmit}>
                <input 
                type="text"
                value={value}
                onChange={handleOnChange}>
                </input>
                <button type="submit">Done</button>
            </form>
        </div>
     
    )
}

const rootstyle: CSSProperties = {

}

export default UserInputComponent