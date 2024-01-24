import React from 'react'
import Sidebar from '../Navbar/Sidebar'
import Posts from '../PostSection/Posts'
import RightBar from '../RightSidebar/RightBar'
import Navbar from '../Navbar/Navbar'
import './Home.css'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='home' style={{display:'flex', flexGrow: '1'}}>
      
      <div >
      <Sidebar/>
      </div>
      <div style={{marginLeft:'400px'}}>
      <Posts/>
      </div>
      <div >
      <RightBar/>
      </div>
      
    </div>
    </>
  )
}

export default Home