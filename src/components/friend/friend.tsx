import { useEffect, useContext, useState, useLayoutEffect } from "react";

import "./friend.css";
import { ChatAppContext } from "../../../context/ChatAppContext";

import Image from "..//..//..//utils/image";

//! importing some useful api
import { getContractInstance } from "..//..//../utils/apiFeature";

type Friend = {
  name: string;
  friendAddress: string;
};

const Friend = () => {
  const [activeFriend, setActiveFriend] = useState<string | null>(null);
  const [prevMsgLength, setPrevMsgLength] = useState(0);
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Friend must be used within a ChatAppContextProvider");
  }

  const {
    friendList,
    setFriendList,
    currentUsername,
    setCurrentUsername,
    currentUserAddress,
    setCurrentUserAddress,
    imageIndex,
    setImageIndex,
    scrollBack,
    friendMsg,
    setFriendMsg,
    readMessage,
    account,
    setAccount,
  } = context;

  useEffect(() => {
    const fetchData = async () => {
      const contract = await getContractInstance();

      const friendLists = await contract.getMyFriendList();
      if (friendLists !== null) {
        setFriendList(friendLists);

        setCurrentUsername(friendLists[0][0]); // Use friendLists instead of friendList
        setCurrentUserAddress(friendLists[0][1]); // Use friendLists instead of friendList
        // scrollBack();
        readMessage(friendLists[0][1]);
      }
    };

    fetchData();
  }, [account, setAccount]); // Remove friendList from the dependency array  //! and add account so the main chat body will get updated this took me i think 2 or 3 hours to figure out 

  useEffect(() => {
    if (friendMsg.length > prevMsgLength) {
      scrollBack();
    }
    setPrevMsgLength(friendMsg.length);
  }, [friendMsg]);

  const handleClickedFriend = (
    event: React.MouseEvent<HTMLDivElement>,
    friend: Friend,
    index
  ) => {
    setImageIndex(index + 1);
    setActiveFriend(friend.name);
    setCurrentUsername(friend.name);
    setCurrentUserAddress(friend.friendAddress);
  };

  return (
    <div className="friends-wrapper">
      {friendList.map((friend, index) => (
        <div
          className={`friend ${activeFriend === friend.name ? "active" : ""}`}
          key={index}
          onClick={(event) => handleClickedFriend(event, friend, index)}
        >
          <div
            className="image-wrapper"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
          >
            <Image
              src={`pic-${index + 1}.svg`}
              alt="profile-pic"
              width={50}
              height={50}
            />
          </div>
          <h1 className="friend-name">{friend.name}</h1>
          {/* <h1 className= "friend-address">{friend.friendAddress.slice(0,25)+"...."}</h1> */}
        </div>
      ))}
    </div>
  );
};

export default Friend;
