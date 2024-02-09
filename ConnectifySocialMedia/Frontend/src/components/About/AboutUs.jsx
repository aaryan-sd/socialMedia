import React from 'react';
import './AboutUs.css'; 
import Sidebar from '../Navbar/Sidebar.js'
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };

    return (
      <div style={{display:'flex'}}>
        <Sidebar />
        
        <div className="about-us-container">
        <button className='backbtn' onClick={handleGoBack}><IoChevronBack /></button>
          <div className="about-us-header">
          
            <div style={{display:'flex', gap:'10px', paddingTop:'20px', paddingBottom:'5px'}}>
              <h1 className="about-text">About</h1>
              <h1 className="connectify-text">Connectify.</h1>
            </div>
            <p>Connecting People, Sharing Memories</p>
          </div>

            <div className="about-us-content">
                <div className="feature">
                    <img src="https://intelliweb.network/hub/files/2022/07/Why-Your-Business-Should-Be-on-Social-Media.jpeg" alt="Share Images" />
                    <div className="feature-text">
                        <h2>Share Images</h2>
                        <p>Share your favorite moments with friends and family.</p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-text">
                        <h2>Like, Comment, Share</h2>
                        <p>Engage with your friends' posts by liking, commenting, and sharing.</p>
                    </div>
                    <img src="https://www.languagesunlimited.com/wp-content/uploads/2023/03/2850942-scaled-e1679561518328.jpg" alt="Like, Comment, Share" />
                </div>

                <div className="feature">
                    <img src="https://bizflyportal.mediacdn.vn/bizflyportal/1520/2427/2021/09/17/17/18/soc16318523151709.jpg" alt="Share Memories" />
                    <div className="feature-text">
                        <h2>Public Forum</h2>
                        <p>Connectify helps you share your thoughts and discuss with people around.</p>
                    </div>
                </div>
            </div>

            

            <footer className="footer" style={{paddingTop:'30px', paddingBottom:'30px'}}>
                <p>Connectify &copy; 2024. A "MERN Stack" Project.</p>
            </footer>
        </div>
      </div>
    );
}

export default AboutUs;
