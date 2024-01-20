import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home"
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateNewPost from './components/CreatePost/CreateNewPost';
import UserProfile from './components/UserProfile/UserProfile';
import MyProfile from './components/MyProfile/MyProfile';
import { UserProvider } from './Context/UserContext';
import { DarkModeContextProvider } from './Context/DarkModeContext';

function App() {
  return (
    <DarkModeContextProvider>
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
    </DarkModeContextProvider>
  );
}

export default App;
