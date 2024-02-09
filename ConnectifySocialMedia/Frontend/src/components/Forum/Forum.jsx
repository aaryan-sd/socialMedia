import React from 'react'
import Sidebar from '../Navbar/Sidebar'
import Tweets from '../TweetSection/Tweets'
import RightBar from '../RightSidebar/RightBar'
import Navbar from '../Navbar/Navbar'
import './Forum.css'
import TweetInput from '../TweetSection/TweetInput'

const Forum = () => {
  return (
    <>
    <Navbar/>
    <div className='home' style={{display:'flex', flexGrow: '1'}}>
      
      <div >
      <Sidebar/>
      </div>
      <div style={{marginLeft:'400px'}}>
        <TweetInput/>
      <Tweets/>
      </div>
      <div >
      <RightBar/>
      </div>
      
    </div>
    </>
  )
}

export default Forum