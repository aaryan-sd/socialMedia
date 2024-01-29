import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../Context/UserContext';
import './MyProfile.css';
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";

const MyProfile = () => {
    const { username: routeUsername } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          // If the user is logged in, use the user's username
          const targetUsername = user ? user.username : routeUsername;
  
          const [profileResponse, postsResponse] = await Promise.all([
            axios.get(`http://localhost:8000/api/v1/users/profile/${targetUsername}`),
            axios.get(`http://localhost:8000/api/v1/posts/p/${targetUsername}`),
          ]);
  
          setUserData(profileResponse.data.data[0]);
          setUserPosts(postsResponse.data.data);
          console.log("profileResponse.data:", profileResponse.data);
          console.log("postsResponse.data:", postsResponse.data.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      fetchUserProfile();
    }, [routeUsername, user]);

    const handleGoBack = () => {
        navigate(-1); // Navigate back one step
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
            <div className='fullname'>
              {userData.fullname}
            </div>
            <div className='username'>
              {userData.username}
            </div>
            <div style={{display:'flex', paddingTop:'10px'}}>
              <div style={{ marginRight: '10px' }}>{userData.followersCount} Followers</div>
              <div style={{ marginLeft: '10px' }}>{userData.followingCount} Following</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading your profile...</p>
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

export default MyProfile;
