import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../Components/Footer/Footer'

const LayoutOne = () => {
  // ============ variables
  const currentUser = useSelector(state=>state.currentUser.value)
  const navigator = useNavigate()

  
  return (
    <div>
        <Navbar/>
        <div className="my-[50px] lg:my-[180px]">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutOne