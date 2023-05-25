import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../css/Profile.css"

export default function Profile() {
  const {user} = useContext(UserContext);
    return (
      <div className="profile-page-container">
        <div className="profile-container">
          <div className="profile-img-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="profile-img"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="profile-role">
              <p>Role : {user.role}</p>
          </div>
          <div className="profile-username">
              <p>Username : {user.username}</p>
          </div>
          <div className="profile-my-forum">
            <p>บทความของฉัน</p>
          </div>
        </div>
      </div>
    );
}
