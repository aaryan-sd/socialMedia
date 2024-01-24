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

const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

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
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
