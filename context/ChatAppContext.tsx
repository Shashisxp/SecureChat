import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

// internal imports

import {
  checkWalletConnection,
  connectWallet,
  getContractInstance,
} from "../utils/apiFeature";

interface AccountDetails {
  name: string;
  accountAddress: string;
}

interface Wallet {
  address: string;
  connected: boolean;
}
// interface Friend  {
//   name: string;
//   friendAddress: string;
// }


interface ChatAppContextType {
  readMessage: (friendAddress: string) => Promise<void>;
  createAccount: (accountDetails: AccountDetails) => Promise<void>;
  addFriends: (accountDetails: AccountDetails) => Promise<void>;
  sendMessage: (friendAddress: string, message: string) => Promise<void>;
  readUser: (userAddress: string) => Promise<void>;
  connectWallet: () => Promise<Wallet | null>;
  checkWalletConnection: () => Promise<Wallet | null>;
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  friendList: string[];
  setFriendList: React.Dispatch<React.SetStateAction<string[]>>;
  friendMsg: string[];
  setFriendMsg: React.Dispatch<React.SetStateAction<never[]>>;
  loading: boolean;
  userLists: AccountDetails[];
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>; // Add this line
  currentUsername: string;
  setCurrentUsername: React.Dispatch<React.SetStateAction<string>>;
  currentUserAddress: string;
  setCurrentUserAddress: React.Dispatch<React.SetStateAction<string>>;
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  lastMessageRef: React.RefObject<HTMLDivElement>;
  scrollBack: () => void;

  // getUSERNAME: () => Promise<void>;
}

export const ChatAppContext = createContext<ChatAppContextType | undefined>(
  undefined
);
// export const ChatAppContext = createContext({});

export const ChatAppProvider = ({ children }: { children: ReactNode }) => {
  //USE STATE
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [friendList, setFriendList] = useState<string[]>([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState(1);
  //Chat user data

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //INTERFACE FOR ACCOUNT DETAILS
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    console.log("Component rendered");

    const fetchData = async () => {
      console.log("fetchData called");

      if (!dataFetched) {
        try {
          const connectAccount = await connectWallet();
          const contract = await getContractInstance();

          if (connectAccount !== null) {
            setAccount(connectAccount.address);
          }

          console.log(` public key : ${connectAccount?.address}`);
          const userName = await contract.getUsername(connectAccount?.address);

          if (userName !== null) {
            console.log({ userName });
            setUsername(userName);
            console.log(`User created successfully: ${username}`);
          }

          const friendLists = await contract.getMyFriendList();
          if (friendLists !== null) {
            setFriendList(friendLists);
          }

          const userList = await contract.getAllAppUser();
          if (userList !== null) {
            setUserLists(userList);
          }

          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  //! this shits here check if the user is registred or not if he or she is then and then only we will ask them for there names
  const isAccountRegistered = async (account: string) => {
    const contract = await getContractInstance();
    const registered = await contract.checkUserExist(account);
    return registered;
  };

  // this use effect is for checking the wallet connection and updating the account state
  //! jaruri useEffect hain for the account changes
  useEffect(() => {
    const handleAccountsChanged = async (accounts: string[]) => {
      // When the accounts array is empty, it means the user has disconnected their wallet
      if (accounts.length === 0) {
        setAccount("");
      } else {
        // When the accounts array is not empty, it means the user has switched accounts
        // So we update the account state with the new account
        setAccount(accounts[0]);

        if (await isAccountRegistered(accounts[0])) {
          getUSERNAME();
          // readMessage(accounts[0]);
          // readUser(accounts[0]);
        }
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [account, setAccount]);

  const lastMessageRef = React.useRef<HTMLDivElement>(null);
    const scrollBack = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  // read message
  const readMessage = async (friendAddress: string) => {
    try {
      const contract = await getContractInstance();

      const read = await contract.readMessage(friendAddress);

      if (read !== null) {
        setFriendMsg(read);
      }
    } catch (error) {
      setError("Currently you have no messages");
    }
  };

  // create account
  const createAccount = async ({ name }: AccountDetails) => {
    try {
      const contract = await getContractInstance();

      const txResponse = await contract.addUser(name);
      console.log(`Transaction Hash: ${txResponse.hash}`);

      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log(`Transaction was successful: ${receipt.status === 1}`);

      window.location.href = "/home"; // Redirect to /home
    } catch (error: unknown) {
      if (!window.ethereum) {
        window.location.href = "/connect"; // Redirect to /connect
        console.log("Please install MetaMask or another Ethereum wallet.");
      }
      if (error instanceof Error) {
        // Now TypeScript knows that `error` is an `Error` object, so you can access its properties
        setError(error.message);
      } else {
        // If it's not an `Error` object, you can handle it differently or throw it again
        throw error;
      }
    }
  };

  const getUSERNAME = async () => {
    try {
      const contract = await getContractInstance();
      const connectAccount = await connectWallet();
      console.log(` public key : ${connectAccount?.address}`);

      const userName = await contract.getUsername(connectAccount?.address);
      if (userName !== null) {
        setUsername(userName);
      }
      // console.log(` hello ${userName}  how are you doing `);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Now TypeScript knows that `error` is an `Error` object, so you can access its properties
        setError(error.message);
      } else {
        // If it's not an `Error` object, you can handle it differently or throw it again
        throw error;
      }
    }
  };
  // add your Friends

  // Inside your component
  const navigate = useNavigate();

  const addFriends = async ({ name, accountAddress }: AccountDetails) => {
    try {
      if (!name || !accountAddress)
        return setError("Please fill all the fields");

      const contract = await getContractInstance();
      const addFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      // To navigate to "/home"
      navigate("/home");
      // window.location.reload();
    } catch (error:unknown) {
      if (error instanceof Error) {
        // Now TypeScript knows that `error` is an `Error` object, so you can access its properties
        setError(error.message);
      } else {
        // If it's not an `Error` object, you can handle it differently or throw it again
        throw error;
      }

    }
  };

  // send message to friend

  const sendMessage = async (friendAddress: string, message: string) => {
    try {
      if (!friendAddress || !message)
        return setError("Please fill all the fields");

      const contract = await getContractInstance();
      const addMessage = await contract.sendMessage(friendAddress, message);

      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      // window.location.reload();
    } catch (error) {
      // document.body.style.overflowY = "hidden";
      setError("Error while sending message reload the page and try again");
    }
  };

  // read the user info

  const readUser = async (userAddress: string) => {
    try {
      const contract = await getContractInstance();

      const userName = await contract.getUsername(userAddress);

      if (userName !== null) {
        setCurrentUsername(userName);
        setCurrentUserAddress(userAddress);
      }
    } catch (error) {
      setError("Currently you have no messages");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkWalletConnection,
        account,
        setAccount,
        username,
        friendList,
        setFriendList,
        friendMsg,
        setFriendMsg,
        loading,
        userLists,
        error,
        setError,
        currentUsername,
        setCurrentUsername,
        currentUserAddress,
        setCurrentUserAddress,
        imageIndex,
        setImageIndex,
        lastMessageRef,
        scrollBack,
        // getUSERNAME,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
