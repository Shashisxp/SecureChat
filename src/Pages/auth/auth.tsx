// internal imports
import { useContext } from "react";
import "./auth.css";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

const Auth = () => {
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Friend must be used within a ChatAppContextProvider");
  }

  const { createAccount } = context;
  return (
    <>
      <div className="real-auth-wrapper">
        <UserCraft
          image="auth-1.svg"
          title="WELCOME TO  "
          mainTitle="SECURE CHAT"
          placeholder1="ENTER YOUR NAME"
          placeholder2=""
          icon1="user.svg"
          icon2="key.svg"
          buttonText="SUBMIT"
          onButtonClick={createAccount}
        />
      </div>
    </>
  );
};

export default Auth;
