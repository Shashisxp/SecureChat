import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useContext, useState, useCallback } from "react";

//internal imports
import "./nav.css";
import { Button } from "../index"; //? some components nothing more then that

import { ChatAppContext } from "../../../context/ChatAppContext";

// import Image from "../../../utils/image";
const Nav = () => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Nav must be used within a ChatAppContextProvider");
  }

  //! consuming the context
  const { connectWallet, account, setAccount, username } = context;

  const navigate = useNavigate();

  // Define the onClick handler here, using useCallback
  const connectWalletOnClick = useCallback(async () => {
    const wallet = await connectWallet();
    if (wallet !== null) {
      setAccount(wallet.address);
    }
  }, [connectWallet, setAccount]);

  // console.log("kaka", username);

  return (
    <>
      <nav className={showMobMenu ? "active navbar" : "navbar"}>
        <Link className="logo" to="/">
          <h1 className="navbar__logo">SecureChat.</h1>
        </Link>
        <ul className="links">
          <li className="links__item-wrapper">
            <div className="main-link">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "links__item aktive" : "links__item"
                }
                to="/home"
              >
                HOME
              </NavLink>
              <Link className="l2" to="/home">
                HOME
              </Link>
            </div>
          </li>
          <li className="links__item-wrapper">
            <div className="main-link">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "links__item aktive" : "links__item"
                }
                to="/users"
              >
                USER
              </NavLink>
              <Link className="l2" to="/users">
                USER
              </Link>
            </div>
          </li>
          <li className="links__item-wrapper">
            <div className="main-link">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "links__item aktive" : "links__item"
                }
                to="/settings"
              >
                CONFIG
              </NavLink>
              <Link className="l2" to="/settings">
                CONFIG
              </Link>
            </div>
          </li>
          <li className="links__item-wrapper">
            <div className="main-link">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "links__item aktive" : "links__item"
                }
                to="/about"
              >
                ABOUT
              </NavLink>
              <Link className="l2" to="/about">
                ABOUT
              </Link>
            </div>
          </li>
        </ul>

        {/* button for creating account */}

        <div className="main-link login-button-wrapper">
          {account === "" ? (
            <Button text="Connect Wallet" onClick={connectWalletOnClick} />
          ) : (
            <Button
              text={username || "Create Account"}
              onClick={() => {
                navigate("/");
              }}
            />
          )}
        </div>

        <div
          className="mobile-navbar-btn"
          onClick={() => {
            setShowMobMenu(!showMobMenu);
          }}
        >
          <svg
            className="open-menu"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            width="26px"
            height="26px"
          >
            <path
              d="M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z"
              fill="#ffffff"
            />
          </svg>

          <svg
            className="close-menu"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="28px"
            height="28px"
          >
            <path
              d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </nav>
    </>
  );
};

export default Nav;
