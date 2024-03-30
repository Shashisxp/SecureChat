import { useState, useEffect, useContext } from "react";

import { ChatAppContext } from "../../../context/ChatAppContext";

//! convert time utility
import { convertTime } from "..//..//../utils/apiFeature";

import "./chat.css";

const Chat = () => {
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Chat must be used within a ChatAppContextProvider");
  }

  const {
    currentUsername,
    setCurrentUsername,
    currentUserAddress,
    setCurrentUserAddress,
    friendMsg,
    setFriendMsg,    
  } = context;


  return <div className="chat-wrapper">HELLO i am chat this is {currentUsername}</div>;
};

export default Chat;
