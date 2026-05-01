// 16
// 17 - Profile.jsx
// 15 - getCurrentUser.jsx

// This page will be protected, if user is authenticated, then show otherwise redirect to login page
import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages'

function Home() {
  let {selectedUser} = useSelector(state=>state.user)
  getMessage()
  return (
    <div className='flex w-full h-[100vh] over'>
        <Sidebar/>
        <MessageArea/>
    </div>
  )
}

export default Home