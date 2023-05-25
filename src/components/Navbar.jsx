import { Link, useNavigate, useMatch } from "react-router-dom";
import logo from "../assets/naruto-logo.png";
import "../css/Navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import REACT_APP_API from "../../env";
import { onLoggedOut } from "../../services/authorize";
export default function Navbar() {
  let path = useMatch("/");
  const redirect = () => {
    // if (path) {
    //   navigate("/");
    //   navigate(0);
    // } else {
    //   navigate("/");
    // }
    navigate(0);
  };
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const popUpRef = useRef(null);
  const arrowRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const handleMenuToggle = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  const handleMenuClick = () => {
    if (window.innerWidth > 768) {
      return true;
    } else {
      setMenuIsOpen(!menuIsOpen);
    }
  };
  const handleUserMenuClick = () => {
    setUserMenu(!userMenu);
  };
  const handleClickOutSide = (event) => {
    if (
      popUpRef.current &&
      !arrowRef.current.contains(event.target) &&
      !popUpRef.current.contains(event.target)
    ) {
      setUserMenu(false);
    }
  };
  // Add event listener to check width on resize
  window.onresize = function (event) {
    let newWidth = window.innerWidth;
    if (newWidth > 768) {
      if (menuIsOpen) {
        setMenuIsOpen(false);
      }
    }
  };
  return (
    <nav className="mycontainer">
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <ul className={`list-container ${menuIsOpen ? " active" : " "}`}>
          <li className="nav-list">
            <Link onClick={handleMenuClick} to="/">
              หน้าหลัก
            </Link>
          </li>
          <li className="nav-list">
            <Link onClick={handleMenuClick} to="/forums">
              บทความ
            </Link>
          </li>
          <li className="nav-list">
            <Link onClick={handleMenuClick} to="/">
              เกี่ยวกับ
            </Link>
          </li>
          <li className="nav-list">
            <Link onClick={handleMenuClick} to="/">
              ติดต่อเรา
            </Link>
          </li>
          {!user && (
            <li className="nav-list">
              <Link onClick={handleMenuClick} to="/login">
                เข้าสู่ระบบ
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-user">
              <div className="nav-user-container">
                <Link
                  className="nav-user-name"
                  to={"/profile"}
                  onClick={() => {
                    setUserMenu(false);
                    handleMenuClick();
                  }}
                >
                  <span className="material-symbols-outlined nav-user-icon">
                    account_circle
                  </span>
                  {user.username}
                </Link>
                <span
                  onClick={handleUserMenuClick}
                  className="material-symbols-outlined nav-user-arrow"
                  ref={arrowRef}
                >
                  arrow_drop_down
                </span>
              </div>
              {userMenu && (
                <div className="nav-user-list-container" ref={popUpRef}>
                  <ul className="nav-user-list">
                    <li className="nav-list">
                      <Link
                        to={"/profile"}
                        onClick={() => {
                          setUserMenu(false);
                          handleMenuClick();
                        }}
                      >
                        โปรไฟล์
                      </Link>
                    </li>
                    <li className="nav-list">
                      <Link
                        to={"/my-forum"}
                        onClick={() => {
                          setUserMenu(false);
                          handleMenuClick();
                        }}
                      >
                        บทความของฉัน
                      </Link>
                    </li>
                    {user.role === "admin" && (
                      <li className="nav-list">
                        <Link
                          to={"/admin/forums"}
                          onClick={() => {
                            setUserMenu(false);
                            handleMenuClick();
                          }}
                        >
                          จัดการบทความ (admin)
                        </Link>
                      </li>
                    )}
                    <li className="nav-list">
                      <Link
                        onClick={() => {
                          onLoggedOut(() => {
                            redirect();
                          });
                        }}
                      >
                        ออกจากระบบ
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hamburger"
          onClick={() => handleMenuToggle()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </nav>
  );
}
