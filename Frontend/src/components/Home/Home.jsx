import React from 'react'
import Sidebar from '../Navbar/Sidebar'
import Posts from '../PostSection/Posts'
import RightBar from '../RightSidebar/RightBar'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='home' style={{display:'flex', flex: 'row'}}>
      
      
      <Sidebar/>
      <div>
      <Posts/>
      </div>
      <div>
      <RightBar/>
      </div>
      
      
    </div>
    </>
  )
}

export default Home