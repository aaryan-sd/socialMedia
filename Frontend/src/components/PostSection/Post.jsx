import React from 'react';
import './Post.css';
import { Link } from "react-router-dom";
import { MdInsertComment } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { useState } from 'react';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import axios from 'axios';


const Post = ({ postid , username , images, caption, likes, comments, createdAt, profilepicture }) => {
  
    console.log(postid)
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
  
    const handleLike = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/posts/${postid}`
        );
        console.log('Response:', response);
  
        if (response.status === 200) {
          setLiked(!liked);
          console.log(liked);
          setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
        } else {
          // Handle error scenarios
          console.error('Failed to like/unlike the post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
          {likeCount}
          <button onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer', color:'red', paddingTop:'20px', paddingLeft:'2px' }}>
            {liked ? <GoHeartFill /> : <GoHeart />}
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
