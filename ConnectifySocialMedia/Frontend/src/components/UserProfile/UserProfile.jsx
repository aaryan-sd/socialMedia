import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader"
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  console.log("userData: ", userData)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const [profileResponse, postsResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/users/profile/${username}`),
          axios.get(`http://localhost:8000/api/v1/posts/p/${username}`),
        ]);

        setUserData(profileResponse.data.data[0]);
        setUserPosts(postsResponse.data.data);
        console.log("profileResponse.data:", profileResponse.data);
        console.log("postsResponse.data:", postsResponse.data.data);
      } catch (error) {
        console.error('Error fetching user profile or posts:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleGoBack = () => {
    navigate("/"); // Navigate back one step
  };

  return (
    <div className="user-profile-container">

    <button onClick={handleGoBack}><IoChevronBack /></button>

      {userData ? (
        <div className="profile-details" style={{display:'flex'}}>
          
        <div className="profile-picture" style={{paddingLeft:'80px'}}>
          <strong></strong> <img src={userData.profilepicture} alt="Profile" />
        </div>
        <div style={{paddingLeft:'50px', paddingTop:'25px'}}>
          <div className='fullname' style={{fontSize:'25px'}}>
            {userData.fullname}
          </div>
          <div className='username'>
            {userData.username}
          </div>
          <div style={{display:'flex', paddingTop:'10px'}}>
            <div style={{ marginRight: '10px' }}>email: {userData.email}</div>
            
          </div>
          
        </div>
      </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>
            <ClipLoader color="rgb(82, 79, 159)" />
          </p>
        </div>
      )}

      {userPosts.length > 0 ? (
        <div className="user-posts">
          
          {userPosts.map((post) => (
            <div key={post._id} className="user-post-item">
              <img src={post.images} alt="Post" />
              <p>{post.caption}</p>
              <p>Likes: {post.likes.length}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available for this user.</p>
      )}
    </div>
  );
};

export default UserProfile;
