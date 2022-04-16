import React, { useState, useEffect } from "react";
import { Send, EmojiEmotions } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";

import "./chat.css";

const Chat = ({ socket }) => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiBox, showEmojiBox] = useState(false);
  const { userID, ownID } = useParams();
  socket.emit("join", ownID);
  useEffect(() => {
    socket.on("send", (data) => {
      setMessages((e) => [
        ...e,
        {
          text: data,
          type: "recive",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ]);
    });
  }, [socket]);
  const handelMessage = () => {
    socket.emit("recive", { id: userID, text: messageValue });
    setMessages((e) => [
      ...e,
      {
        text: messageValue,
        type: "send",
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    ]);
    setMessageValue("");
  };
  const pickEmoji = (event, emojiObject) => {
    setMessageValue((e) => (e += emojiObject.emoji));
  };
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((item) => (
          <div type={item.type}>
            {item.text}
            <span>{item.time}</span>
          </div>
        ))}
      </div>
      <div className="send">
        <EmojiEmotions onClick={() => showEmojiBox(!emojiBox)} />
        <input
          type="text"
          placeholder="say hello..."
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handelMessage() : null)}
          value={messageValue}
        />
        <Send onClick={handelMessage} />
      </div>
      {!emojiBox ? null : <Picker onEmojiClick={pickEmoji} />}
    </div>
  );
};

export default Chat;
