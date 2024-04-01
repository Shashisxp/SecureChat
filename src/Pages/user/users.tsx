// users.tsx
import { useContext } from "react";

//internal imports
import "./users.css";
// my components
import { Nav, UserCard } from "..//../components/index";
//import the context
import { ChatAppContext } from "../../../context/ChatAppContext";

interface AccountDetails {
  name: string;
  accountAddress: string;
}

const Users = () => {
  // now consume the context in here we only need the userLists and the addFreinds function\
  const context = useContext(ChatAppContext);
  if (!context) {
    throw new Error("Users must be used within a ChatAppContextProvider");
  }
  const { userLists, addFriends } = context;

  return (
    <>
      <Nav />
      <div className="users-wrapper">
        <div className="users-container">
          <div className="users-list">
            {/* map through the userLists and display the user card */}
            {userLists.map((element: AccountDetails, index: number) => (
              <UserCard
                key={index + 1}
                element={element}
                index={index}
                addFriends={addFriends}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;