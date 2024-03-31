import { useState, useEffect, useContext } from "react";

import { ChatAppContext } from "../../../context/ChatAppContext";

//! convert time utility
import { convertTime } from "..//..//../utils/apiFeature";

import "./chat.css";

//! some Uitlities below

import { getContractInstance } from "..//..//..//utils/apiFeature";

import Image from "..//..//..//utils/image";

const Chat = () => {
  const [msg, setMsg] = useState("");
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
    Error,
    setError,
    setImageIndex,
  } = context;

  const sendMsg = async (friendAddress: string, message: string) => {
    try {
      if (!friendAddress || !message)
        return setError("Please fill all the fields");

      const contract = await getContractInstance();
      const addMessage = await contract.sendMessage(friendAddress, message);

      // setLoading(true);
      await addMessage.wait();
      // console.log("Message sent to ", friendAddress, "Message: ", message);

      // // reading the message
      // const read = await contract.readMessage(friendAddress);

      // if (read !== null) {
      //   setFriendMsg(read);
      // }

      // console.log("the real message " ,read);
      // console.log("the real message STATE" ,friendMsg);
      // setLoading(false);
      // window.location.reload();
    } catch (error) {
      // document.body.style.overflowY = "hidden";
      setError("Error while sending message reload the page and try again");
    }
  };

  const handleSendMessage = () => {
    const message = msg; // the message we need to send to our solidity backend
    sendMsg(currentUserAddress, message);
    setMsg("");
  };

  useEffect(() => {
    // read message
    const readMessage = async (friendAddress: string) => {
      try {
        const contract = await getContractInstance();

        const read = await contract.readMessage(friendAddress);

        if (read !== null) {
          setFriendMsg(read);
        }
        console.log("the real message STATE", friendMsg);
      } catch (error) {
        // setError("Currently you have no messages");
      }
    };

    readMessage(currentUserAddress); // Call the function with the appropriate argument
  }, [friendMsg, currentUserAddress]); // Remove the extra closing brace and parenthesis

  // setLoading(false);

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
          <p>{currentUserAddress.slice(0, 18) + "..."}</p>
        </div>
      </div>
      <div className="chat-body">
        {friendMsg.map((message, index) => (
          <div key={index}>
            <p>{message[0]}</p> {/* The message text */}
            <p>{message[1]}</p> {/* The sender's public address */}
            <p>{new Date(Number(message[2])).toString()}</p>{" "}
            {/* The time, converted to a Date object */}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message"
          onChange={(event) => setMsg(event.target.value)}
          value={msg}
        />
        <button className="send-msg-btn" onClick={handleSendMessage}>
          <Image src="send.svg" alt="profile-pic" width={25} height={25} />
        </button>{" "}
      </div>
    </div>
  );
};

export default Chat;
