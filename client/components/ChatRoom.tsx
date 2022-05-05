import { height } from "@mui/system";
import { CSSProperties, useState } from "react";
import ChatBubble from "./ChatBubble";
import {useSockets} from '../context/socket.context'

const ChatRoom = () => {
    const [value, setValue] = useState<string>("");
    const { sendMessage } = useSockets();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value)
        sendMessage(value);
    }
    const handleChange = (e) => {

        setValue(e.target.value)
    }

    return (
        <div style={rootstyle}>
            <div style={chatsDivStyle}>
                <ChatBubble />
            </div>
            <form action="" style={formStyle} onSubmit={handleSubmit}>
                <input value={value} onChange={handleChange} style={inputStyle} type="text" placeholder="Join the conversation..."/>
            </form>
        </div>
    )
}

const rootstyle: CSSProperties = {
    border: "2px solid red",
    height: "100%",
    marginLeft: "180px", //Samma som sidebarens width
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const inputStyle: CSSProperties = {
    width: "60%",
    borderRadius: "50px",
    border: 'none',
    height: '2.5rem',
    background: "rgba(255, 255, 255, 0.3)"
}

const chatsDivStyle: CSSProperties = {
    border: '2px solid blue',
    height: "85%",
    width: "60%",
    marginBottom: "2rem"
}

const formStyle: CSSProperties = {
    width: "100%",
    textAlign: 'center',
    height: "10%"
}

export default ChatRoom;