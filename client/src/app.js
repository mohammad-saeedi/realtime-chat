import React from "react";
import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Auth from "./components/auth/auth";
import Chat from "./components/chat/chat";
import "./app.css";

const socket = io.connect("http://localhost:5000")

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth socket={socket} />} />
      <Route path="/chat/:ownID/:userID" element={<Chat socket={socket} />} />
    </Routes>
  );
};

export default App;
