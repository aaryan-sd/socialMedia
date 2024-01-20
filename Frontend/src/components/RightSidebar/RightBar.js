import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import "./RightBar.css";
import { MdAddCircleOutline } from "react-icons/md";

const RightBar = () => {
  const { user, logoutUser } = useUser();
  console.log("loggedin user:", user)
  return (

    <div className="rightBar">
      
      <div className="container">
        <div className="item">
          
          <div className="user">
            <div className="userInfo">
              {
                user ? (

                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: '10px', paddingLeft: '40px'}}>
                    <img src={user.profilepicture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <div>
                    <p style={{paddingLeft:'10px'}}>{user.fullname}</p>
                    <p style={{paddingLeft:'10px'}}>{user.username}</p>
                    
                    </div>
                  </div>

                ) : (<></>)
              }
            </div>
            <div className="buttons">
              
            </div>
          </div>

          {
                user ? (

          <div className="user" >
            
            <div className="buttons" style={{paddingLeft:'40px',paddingRight:'40px',display: 'flex', borderRadius: '30px', padding: '5px', marginLeft:'40px', marginRight:'40px', backgroundColor:'#ded3e7'}}>
              <Link to={`/myprofile/${user?.username}`} style={{ textDecoration: 'none' }} >View Profile</Link>
            </div>
          </div>

              ) : (<></>)
          }

        </div>
        <div className="item">
        <div>
          <span style={{ display: 'block', textAlign:'center', color:'black' }}>Post your moments,</span>
          <span style={{ display: 'block', textAlign:'center', color:'black' }}>Amplify the Joy!</span>
        </div>
        {
                user ? (
          <div className="user">
            <div style={{ display: 'flex', borderRadius: '10px', padding: '5px', paddingLeft:'120px', paddingRight:'120px', fontSize:'25px', backgroundColor:'#ded3e7' }}>
              <p>
                <Link to={'/createpost'}><MdAddCircleOutline /></Link> 
              </p>
            </div>
           
          </div>
          ) : (<></>)
        }
          
          
        </div>
        
      </div>
    </div>
  );
};

export default RightBar;
