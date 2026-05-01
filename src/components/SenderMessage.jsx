// 27
// 28 - ReceiverMessage.jsx
// 26 - message.routes.js

import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/emptydp.png"

// displays a chat message sent by the current user (you).

function SenderMessage({image, message}) {
  // This creates a reference to the message bubble on the page.
  let scroll = useRef()
  // gets your logged-in user's info from Redux, including their profile photo.
  let {userData} = useSelector(state=>state.user)
  // Any time a message (or image) appears, makes the page automatically scroll to this message.
  scroll.current.scrollIntoView({behavior:"smooth"})

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className='flex items-start gap-[10px]'>            
      <div  ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[rgb(23, 151, 194)] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
      {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
      {message && <span >{message}</span>}
      </div>
      <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg '
      >
        <img src={userData.image || dp} alt="" className='h-[100%] w-full object-cover'/>
      </div>
    </div>
  )
}

export default SenderMessage