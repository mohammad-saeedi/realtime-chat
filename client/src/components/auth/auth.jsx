import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./auth.css";

const ownID = uuid();

const Auth = ({ socket }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const login = () => {
    socket.emit("join", ownID);
    navigate(`/chat/${ownID}/${id}`);
  };
  return (
    <div className="auth-container">
      <h1>login</h1>
      <p>your ip: {ownID}</p>
      <input
        type="text"
        onChange={(e) => setId(e.target.value)}
        placeholder="enter your contact ip..."
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Auth;
