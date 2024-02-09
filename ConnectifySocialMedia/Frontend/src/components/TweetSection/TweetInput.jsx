import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../Context/UserContext';
import './TweetInput.css'

const TweetInput = () => {
  const [newTweet, setNewTweet] = useState('');
  const { user } = useUser(); 

  const handleTweetChange = (event) => {
    setNewTweet(event.target.value);
  };

  const handleSubmitTweet = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/tweets/write-tweet',
        {
            tweetwriter: user._id,
            tweet: newTweet,
        }
      );
        console.log("response:",response)
      if (response) {
        toast.success('Tweet posted successfully');
        setNewTweet('');
      } else {
        console.error("Failed to post tweet");
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div className="tweet-input-section">
      <input
        type="text"
        value={newTweet}
        onChange={handleTweetChange}
        placeholder="Start a Discussion Thread..."
      />
      <button onClick={handleSubmitTweet}>Send</button>
      <ToastContainer />
    </div>
  );
};

export default TweetInput;
