// import { useContext } from 'react';
import { useContext, useEffect } from "react";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

import "./home.css";
import { Nav, Friend, Chat } from "..//..//components/index";

import { getContractInstance } from "..//..//..//utils/apiFeature";
// import { ChatAppContext } from '../../../context/ChatAppContext';

const Home = () => {
  // const title  = useContext(ChatAppContext);
  // const [showAddFriend, setShowAddFriend] = useState(true);
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Friend must be used within a ChatAppContextProvider");
  }

  const {
    addFriends,
    friendList,
    setFriendList,
    account,
    setAccount,
    friendMsg,
    currentUserAddress,
    currentUsername,
    username,
  } = context;

  useEffect(() => {
    const fetchData = async () => {
      const contract = await getContractInstance();

      const friendLists = await contract.getMyFriendList();
      if (friendLists !== null) {
        setFriendList(friendLists);
      } else {
        setFriendList([]);
      }
    };

    fetchData();
  }, [
    friendList,
    setFriendList,
    friendMsg,
    currentUserAddress,
    account,
    setAccount,
  ]); // Remove friendList from the dependency array

  // useEffect(() => {
  //   setFriendList([]);
  // }, [account, setAccount]);

  return (
    <div className="home-wrapper">
      <Nav />

      {friendList && friendList.length > 0 ? (
        <div className="all-chat-wrapper">
          {" "}
          <Friend /> <Chat />{" "}
        </div>
      ) : (
        <UserCraft
          image="hero-0.svg"
          title="Discover and chat with friends easily."
          mainTitle=""
          placeholder1="Enter Your Friend's Name"
          placeholder2="Enter Your Friend's Public Address"
          icon1="user.svg"
          icon2="key.svg"
          buttonText="ADD FRIEND"
          onButtonClick={addFriends}
        />
      )}
    </div>
  );
};

export default Home;
