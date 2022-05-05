import { height } from "@mui/system";
import { CSSProperties } from "react";

const ChatRoom = () => {
    return (
        <div style={rootstyle}>
            <div style={chatsDivStyle}>
                
            </div>
            <form action="" style={formStyle}>
                <input style={inputStyle} type="text" placeholder="Join the conversation..."/>
            </form>
        </div>
    )
}

const rootstyle: CSSProperties = {
    border: "2px solid red",
    height: "100%",
    marginLeft: "180px" //Samma som sidebarens width
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
    height: "90%"
}

const formStyle: CSSProperties = {
    width: "100%",
    textAlign: 'center',
    height: "10%"
}

export default ChatRoom;