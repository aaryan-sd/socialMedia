import React from 'react';
import './Post.css';
import { Link } from "react-router-dom";
import { MdInsertComment } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { useState } from 'react';

const Post = ({ username , images, caption, likes, comments, createdAt, profilepicture }) => {
  
  
    const [liked, setLiked] = useState(false);
    const [like, setLikes] = useState(0);
  
    const handleLike = () => {
      if (!liked) {
        setLikes(like + 1);
      } else {
        setLikes(like - 1);
      }
      setLiked(!liked);
    };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo" >
            <img src={profilepicture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div className="details" style={{display:'flex'}}>
              <Link
                to={`/userprofile/${username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{username}</span>
              </Link>
              <div className="date">{new Date(createdAt).toLocaleString()}</div>
            </div>
          </div>
          
        </div>
        <div className="content">
        <img src={images} alt="" style={{ width: '40rem', height: '25rem', borderRadius: '10px' }} />
          <p>{caption}</p>
          
        </div>
        <div className="info">
        <div className="item">
          {likes}
          <button onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer', color:'black' }}>
            {liked ? <BiSolidLike /> : <BiLike />}
          </button>
        </div>
          <div className="item">
          <MdInsertComment /> 
            {comments}
          </div>
          <div className="item">
          <PiShareFatFill />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Post;
