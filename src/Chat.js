import React, { useState } from 'react'
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");

const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {    //for message sending
        message: input,
        name: "Demo",
        timestamp: "Just Now!",
        received: true,
    });

    setInput("");
};
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3> Room name </h3>
                    <p> Last seen at.... </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    //if message.received then go chat__receiver
                    <p className={`chat__message ${message.received && "chat__receiver"}`}> 
                        <span className="chat__name">{message.name}</span>    
                        {message.message}    
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message"
                        type="text" 
                    />
                    <button onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    );
}

export default Chat
