import React from "react";
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";
import { IoMdCloud } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GrServices } from "react-icons/gr";
import { PiSignOutFill } from "react-icons/pi";
import { SiContentful } from "react-icons/si";
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";

const Sidebar = () => {
  return (
    <body>
      <div className="container">
        <div className="sidebar">
          <ul>
            <li>
              
            </li>
            <li>
              <NavLink exact to="/">
                <span className="icon">
                <MdOutlineExplore />
                </span>
                <span className="title">Posts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/forum" >
                <span className="icon">
                  <GoCommentDiscussion />
                </span>
                <span className="title">Forum</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" >
                <span className="icon">
                <SiContentful />
                </span>
                <span className="title">About Connectify</span>
              </NavLink>
            </li>
            
            
            
          </ul>
        </div>
      </div>
    </body>
  );
};

export default Sidebar;
