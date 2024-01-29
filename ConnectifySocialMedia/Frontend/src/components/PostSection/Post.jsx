import React, { useState, useEffect } from "react";
import "./Post.css";
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
import ClipLoader from "react-spinners/ClipLoader.js"


const Post = ({
  postid,
  username,
  images,
  caption,
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
        `http://localhost:8000/api/v1/posts/${postid}`
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
          `http://localhost:8000/api/v1/comments/post-comment`,
          {
            commenter: user._id, // Use currentUserId as commenter
            comment: newComment,
            postId: postid,
          }
        );
        console.log("response after commenting: ",response)
        updateComments(postid, response.data.data.savedComment);
      
        // Reset the new comment input field
        setNewComment('');
      } else {
        // Handle the case where user is null or not logged in
        console.error('User is not logged in');
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleShare = () => {
    if (!images) {
      toast.error('Image URL not found');
      return;
    }
  

    navigator.clipboard.writeText(images)
      .then(() => {
        toast.success('Post Link copied to clipboard');
      })
      .catch(error => {
        toast.error('Failed to copy link to clipboard');
        console.error('Error copying to clipboard:', error);
      });
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
        toast.success('Comment deleted successfully');
      } else {
        toast.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  
  return (
    <div className="post">
      {loading ? ( 
        <div className="spinner-container">
          <ClipLoader color="rgb(82, 79, 159)" />
        </div>
      ) : (
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={profilepicture}
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="details" style={{ display: "flex" }}>
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
          <img
            src={images}
            alt=""
            style={{ width: "40rem", height: "25rem", borderRadius: "10px" }}
          />
          <p>{caption}</p>
          <div className="info">
            <div className="item">
              {likeCount}
              <button
                onClick={handleLike}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                  paddingTop: "20px",
                  paddingLeft: "2px",
                }}
              >
                {liked ? <GoHeartFill /> : <GoHeart />}
              </button>
              <ToastContainer />
            </div>
            <div className="item" onClick={toggleComments}>
              <FaRegComment />
              {commentcount}
            </div>
            <div className="item" style={{paddingLeft:'10px'}} onClick={handleShare}>
              <FaLocationArrow /> <div className="sharebtn" style={{fontSize:'1rem'}}>Share</div>
            </div>
          </div>
          {showComments && (
            <div className="comments-container">
              <div className="post-comment-input-section">
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                />
                <button onClick={handleSubmitComment}>Send</button>
                <ToastContainer />
              </div>
              <h3 style={{paddingTop:'10px', paddingBottom:'10px'}}></h3>
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li key={comment._id} className="comment-item">
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
                            <button onClick={() => handleDeleteComment(comment._id)}><MdOutlineDelete /></button>
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

export default Post;