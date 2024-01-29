import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateNewPost.css'; 
import { IoChevronBack } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";


const CreateNewPost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    images: null,
    caption: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForBackend = new FormData();
      formDataForBackend.append('images', formData.images);
      formDataForBackend.append('caption', formData.caption);

      // Assuming your backend is running on http://localhost:8000
      const response = await axios.post('http://localhost:8000/api/v1/posts/create-post', formDataForBackend, {
        withCredentials: true,  
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      console.log(response)
      // Check if 'response' is defined before accessing 'data'
      if (response && response.data) {
        // Handle the response from the backend (success or failure)
        console.log('New post created:', response.data);

        // Reset form data after creating a new post
        setFormData({
          images: null,
          caption: '',
        });

        // Redirect the user to the posts or dashboard page after successful post creation
        navigate('/');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle errors from the backend
      console.error('Post creation failed:', error.response ? error.response.data : error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <div className="create-new-post-container" style={{marginTop:'80px', backgroundColor:'rgb(193 190 255)'}}>

    <button onClick={handleGoBack}><IoChevronBack /></button>

      <h1 style={{textAlign:'center'}}>New Post</h1>
      <form onSubmit={handleSubmit} >
        <div className="form-group" style={{display:'flex', paddingTop:'30px',justifyContent: 'center', alignItems: 'center'}}>
          <label htmlFor="images" onClick={handleFileButtonClick}>
            <MdAddPhotoAlternate style={{ fontSize: '50px', cursor: 'pointer' }} />
          </label>
          <input
            type="file"
            id="images"
            name="images"
            ref={fileInputRef}
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            required
            style={{ display: 'none' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" style={{marginLeft:'150px'}}>Post</button>
      </form>
    </div>
  );
};

export default CreateNewPost;
