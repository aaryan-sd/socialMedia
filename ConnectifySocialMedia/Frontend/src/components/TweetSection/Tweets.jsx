import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import './Tweets.css';

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

const Tweets = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/tweets/all-tweets');
        const fetchedTweets = response.data.data; // Assuming the posts are in the 'data' property

        // Fetch user profiles and comments for each post
        const updatedTweets = await Promise.all(
          fetchedTweets.map(async (tweet) => {
            const userData = await fetchUserData(tweet.tweetwriter.username);
            const commentsResponse = await axios.get(`http://localhost:8000/api/v1/comments/t/${tweet._id}`);
            const comments = commentsResponse.data.data;
            console.log("tweetsResponse: ", commentsResponse)
            return { ...tweet, userProfilePicture: userData.profilepicture, comments };
          })
        );

        setTweets(updatedTweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  const updateComments = (tweetId, newComment) => {
    const updatedTweets = tweets.map(tweet => {
      if (tweet._id === tweetId) {
        return {
          ...tweet,
          comments: [...tweet.comments, newComment]
        };
      }
      return tweet;
    });
    setTweets(updatedTweets);
  };

  return (
    <div className="tweets-container">
      
      {tweets.map((tweet) => (
        <Tweet
          key={tweet._id}
          tweetid={tweet._id}
          username={tweet.tweetwriter.username}
          profilepicture={tweet.userProfilePicture}
          tweet={tweet.tweet}
          likes={tweet.likes.length}
          commentcount={tweet.comments.length}
          createdAt={tweet.createdAt}
          comments={tweet.comments} 
          updateComments={updateComments}
        />
      
      ))}
    </div>
  );
};

export default Tweets;
