import React, { useState, useEffect } from "react";
import "./Tweet.css";
import { Link } from "react-router-dom";
import { MdInsertComment } from "react-icons/md";
import { PiShareFatFill } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from "axios";
import { useUser } from '../../Context/UserContext.jsx';
import { BsArrowReturnRight } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLocationArrow } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader.js";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { IoSendSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";

const Tweet = ({
  tweetid,
  username,
  tweet,
  likes,
  commentcount,
  createdAt,
  profilepicture,
  comments,
  updateComments
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { user } = useUser(); 
  console.log("user:",user)
  console.log("comments:", comments)
  const [loading, setLoading] = useState(true); 
  const [isDownvoted, setIsDownvoted] = useState(false);

  useEffect(() => {
    setLoading(false); 
  }, []);
  

  const handleLike = async () => {
    try {
      if (!user) {
        toast.error('Please log in to use this functionality');
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/v1/tweets/${tweetid}`
      );
      console.log("Response:", response);

      if (response.status === 200) {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      } else {
        console.error("Failed to like/unlike the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      if (!user) {
        toast.error('Please log in to use this functionality');
        return;
      }

      if (user) {
        const { currentUserId } = user._id; // Assuming your user object has an 'id' property
        
        // Now you can use 'currentUserId' in your axios post request
        const response = await axios.post(
          `http://localhost:8000/api/v1/comments/reply-tweet`,
          {
            commenter: user._id, // Use currentUserId as commenter
            comment: newComment,
            tweetId: tweetid,
          }
        );
        console.log("response after commenting: ",response)
        updateComments(tweetid, response.data.data.savedComment);
      
        // Reset the new comment input field
        setNewComment('');
      } else {
        // Handle the case where user is null or not logged in
        console.error('User is not logged in');
      }
    } catch (error) {
      console.error("Error commenting to tweet:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/comments/${commentId}`
      );

      if (response.status === 200) {
        // Filter out the deleted comment from the state
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        updateComments(updatedComments);
        toast.success('Comment deleted successfully for tweet');
      } else {
        toast.error('Failed to delete comment of tweet');
      }
    } catch (error) {
      console.error('Error deleting comment of tweet:', error);
      toast.error('Failed to delete comment');
    }
  };

  const getElapsedTime = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const elapsedTime = Math.abs(currentTime - postTime);
  
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };
  
  const handleToggle = () => {
    setIsDownvoted(prevState => !prevState);
  };

  
  return (
    <div className="tweet">

      {loading ? ( 
        <div className="spinner-container">
          <ClipLoader color="rgb(82, 79, 159)" />
        </div>
      ) : (
      <div className="tweet-container">
            
        <div className="user">
          <div className="userInfo">
            <Link
                  to={`/userprofile/${username}`}
                  style={{ textDecoration: "none", color: "inherit" }}
            >
            <img
              src={profilepicture}
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            </Link>
            <div className="details" style={{ display: "flex" }}>
              <Link
                to={`/userprofile/${username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{username}</span>
              </Link>
              <div className="date">{getElapsedTime(createdAt)}</div>
            </div>
          </div>
        </div>
        <div className="tweet-content">
          <p>{tweet}</p>
          <div className="info">
            <div className="item">
            {likeCount}
              <button
                onClick={handleLike}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgb(82, 79, 159)",
                  paddingTop: "15px",
                  paddingLeft: "2px",
                }}
              >
                {liked ? <BiSolidUpvote /> : <BiUpvote />}
              </button>
              
              <ToastContainer />
            </div>
            <div className="item" onClick={toggleComments}>
            <BiCommentDetail />
              {commentcount}
            </div>
            
          </div>
          {showComments && (
            <div className="comments-container">
              <div className="tweet-comment-input-section">
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Reply..."
                />
                <button onClick={handleSubmitComment}><IoSendSharp /></button>
                <ToastContainer />
              </div>
              <h3 style={{paddingTop:'10px', paddingBottom:'10px'}}></h3>
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li key={comment._id} className="tweet-comment-item">
                        <img
                          src={comment.commenterData?.profilepicture}
                          alt="Profile"
                          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight:'20px' }}
                        />
                        <div style={{display:'flex'}}>
                        <div style={{display:'grid'}}>
                          <span className="commenter">{comment.commenterData?.username}</span>{" "}
                          {comment.comment}
                        </div>
                        <div>
                          {user && (
                            <button onClick={() => handleDeleteComment(comment._id)}><MdOutlineDelete style={{background:'none'}} /></button>
                          )}
                        </div>
                        </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    
      )}
    </div>
    
  );
};

export default Tweet;