import { useEffect, useContext, useState } from "react";

import "./friend.css";
import { ChatAppContext } from "../../../context/ChatAppContext";

import Image from "..//..//..//utils/image";

//! importing some useful api
import { getContractInstance } from "..//..//../utils/apiFeature";

// interface Friend  {
//   name: string;
//   friendAddress: string;
// }

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
    setCurrentUsername,
    setCurrentUserAddress,
    setImageIndex,
    scrollBack,
    friendMsg,
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
    friend: string,
    index : number
  ) => {
    setImageIndex(index + 1);
    setActiveFriend(friend[0]);
    setCurrentUsername(friend[0]);
    setCurrentUserAddress(friend[1]);
  };

  return (
    <div className="friends-wrapper">
      {friendList.map((friend, index) => (
        <div
          className={`friend ${activeFriend === friend[0] ? "active" : ""}`}
          key={index}
          onClick={() => handleClickedFriend( friend, index)}
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
          <h1 className="friend-name">{friend[0]}</h1>
          {/* <h1 className= "friend-address">{friend.friendAddress.slice(0,25)+"...."}</h1> */}
        </div>
      ))}
    </div>
  );
};

export default Friend;
