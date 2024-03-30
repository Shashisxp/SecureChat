import { useState, useEffect, useContext } from "react";

import { ChatAppContext } from "../../../context/ChatAppContext";

//! convert time utility
import { convertTime } from "..//..//../utils/apiFeature";

import "./chat.css";

//! some Uitlities below 

import Image from "..//..//..//utils/image";

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
    imageIndex,
    setImageIndex,
  } = context;

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
      <div
         
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
          >
            <Image
              src={`pic-${imageIndex}.svg`}
              alt="profile-pic"
              width={50}
              height={50}
            />
          </div>
        <div className="chat-header-info">
          <h3>{currentUsername}</h3>
          <p>{currentUserAddress.slice(0,18)+ "..."}</p>
        </div>
      </div>
      {/* <div className="chat-body">
        {friendMsg.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="message-info">
              <p>{msg.sender}</p>
              <p>{convertTime(msg.time)}</p>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </div> */}

      {/* <div className="chat-footer">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
        </div> */}

    </div>
  );
};

export default Chat;
