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

        // Fetch user profiles and comments for each post
        const updatedPosts = await Promise.all(
          fetchedPosts.map(async (post) => {
            const userData = await fetchUserData(post.postuploader.username);
            const commentsResponse = await axios.get(`http://localhost:8000/api/v1/comments/${post._id}`);
            const comments = commentsResponse.data.data;
            console.log("commentsResponse: ", commentsResponse)
            return { ...post, userProfilePicture: userData.profilepicture, comments };
          })
        );

        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const updateComments = (postId, newComment) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post
          key={post._id}
          postid={post._id}
          username={post.postuploader.username}
          profilepicture={post.userProfilePicture}
          images={post.images}
          caption={post.caption}
          likes={post.likes.length}
          commentcount={post.comments.length}
          createdAt={post.createdAt}
          comments={post.comments} 
          updateComments={updateComments}
        />
      ))}
    </div>
  );
};

export default Posts;
