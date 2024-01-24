import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode, MdDisplaySettings } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useUser } from "../../Context/UserContext"; 
import './Navbar.css'
import useTheme from "../../Context/theme";

const Navbar = () => {
  const {themeMode, lightTheme, darkTheme} = useTheme()
  
  const { user, logoutUser } = useUser();

  const handleLogout = async () => {
    await logoutUser();
    console.log("user logged out successfully");
  };

  const onChange = () => {
    if(themeMode === 'dark'){
      lightTheme()
    }
    else{
      darkTheme()
    }
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none", paddingLeft:'30px' }}>
          <span>Connectify.</span>
        </Link>

        <div className="toggle-button" onClick={onChange} style={{cursor:'pointer', fontSize: '1.5rem'}}>
          {themeMode === 'dark' ? <IoSunnyOutline /> : <MdDarkMode />}
        </div>

        <div className="search">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <IoPersonSharp />
        <div className="user">

            <div className="right-bar">
                {user ? (
                <div style={{display:"flex"}}>
                    <p style={{paddingRight:'50px', paddingTop:'10px'}}>Welcome, {user.fullname}!</p>
                    <button onClick={handleLogout} style={{backgroundColor:'#524f9f', marginRight:'20px'}}>Logout</button>
                </div>
                ) : (
                <div>
                    <Link to="/login">
                    <button style={{backgroundColor:'#524f9f', marginRight: '10px'}}>Login</button>
                    </Link>
                    <Link to="/register">
                    <button style={{backgroundColor:'#524f9f'}}>Sign Up</button>
                    </Link>
                </div>
                )}  
            </div>
            
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
