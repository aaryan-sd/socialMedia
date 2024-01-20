import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import './Posts.css';

// Define the fetchUserData function here
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/users/profile/${username}`);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/posts/all-posts');
        const fetchedPosts = response.data.data; // Assuming the posts are in the 'data' property
        console.log(fetchedPosts);

        // Fetch user profiles for each post
        const updatedPosts = await Promise.all(
          fetchedPosts.map(async (post) => {
            console.log("username: ", post.postuploader.username);
            const userData = await fetchUserData(post.postuploader.username);
            console.log("userData: ", userData);
            console.log("userData.profilepicture: ", userData.profilepicture);
            return { ...post, userProfilePicture: userData.profilepicture };
          })
        );

        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post
          key={post._id}
          username={post.postuploader.username}
          profilepicture={post.userProfilePicture}
          images={post.images}
          caption={post.caption}
          likes={post.likes.length}
          comments={post.comments.length}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default Posts;
