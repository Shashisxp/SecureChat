// import { useContext } from 'react';
import { useContext } from "react";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

import "./home.css";
import { Nav, Friend } from "..//..//components/index";
// import { ChatAppContext } from '../../../context/ChatAppContext';

const Home = () => {
  // const title  = useContext(ChatAppContext);
  // const [showAddFriend, setShowAddFriend] = useState(true);
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Friend must be used within a ChatAppContextProvider");
  }

  const { addFriends, friendList } = context;

  if (friendList && friendList.length > 0) {
    // setShowAddFriend(false);
    console.log(friendList[0][0] + " " + friendList[0][1]);
  }

  return (
    <div className="home-wrapper">
      <Nav />

      {friendList && friendList.length > 0 ? (

        <div className="all-chat-wrapper"> <Friend /></div>
       
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
