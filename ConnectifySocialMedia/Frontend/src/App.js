import React, { useContext, useEffect, useState } from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home"
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateNewPost from './components/CreatePost/CreateNewPost';
import UserProfile from './components/UserProfile/UserProfile';
import MyProfile from './components/MyProfile/MyProfile';
import { UserProvider } from './Context/UserContext';
import { ThemeProvider } from './Context/theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from './components/About/AboutUs';
import Sidebar from './components/Navbar/Sidebar';
import Forum from './components/Forum/Forum';


const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    setThemeMode('dark');
    localStorage.setItem('themeMode', 'dark');
  };
  
  const lightTheme = () => {
    setThemeMode('light');
    localStorage.setItem('themeMode', 'light');
  };

  useEffect(()=> {
    document.querySelector('html').classList.remove('dark','light')
    document.querySelector('html').classList.add(themeMode)
    console.log(themeMode)
  }, [themeMode])

  return (
    
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      
      <UserProvider>
        <Router>
          <div>
          
            <Routes>
            
              <Route path="/" element={<Home />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/createpost" element={<CreateNewPost />} />
              <Route path="/userprofile/:username" element={<UserProfile />} />
              <Route path="/myprofile/:username" element={<MyProfile />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/forum" element={<Forum />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
      
    </ThemeProvider>
    
  );
}

export default App;
