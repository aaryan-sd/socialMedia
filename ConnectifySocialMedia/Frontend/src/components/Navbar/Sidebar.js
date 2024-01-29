import React from "react";
import "./Sidebar.css";
import { IoMdCloud } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GrServices } from "react-icons/gr";
import { PiSignOutFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <body>
      <div className="container">
        <div className="sidebar">
          <ul>
            <li>
              
            </li>
            <li>
              <a href="/" >
                <span className="icon">
                <IoHomeOutline />
                </span>
                <span className="title">Home</span>
              </a>
            </li>
            <li>
              <a href="/about">
                <span className="icon">
                <LuMessageSquare />
                </span>
                <span className="title">About Connectify</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                <LiaUserFriendsSolid />
                </span>
                <span className="title">Friends</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">
                <GrServices />
                </span>
                <span className="title">Services</span>
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </body>
  );
};

export default Sidebar;