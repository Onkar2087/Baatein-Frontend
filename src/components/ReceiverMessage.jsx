// 28
// 29 - getMessages.jsx
// 27 - SenderMessage.jsx
import React, { useEffect, useRef } from 'react'
import dp from "../assets/emptydp.png"
import { useSelector } from 'react-redux'


function ReceiverMessage({image, message}) {
  let scroll = useRef()
  let {selectedUser} = useSelector(state=>state.user);

  // automatically scroll the chat to this new message every time the message or its image changes.
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }, [message, image])

  // Why this fn? - Jab load ho rahi hai image toh scroll poori nahi ho rahi neeche tak
  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className='flex items-start gap-[10px]'>
      <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg '
          onClick={()=>navigate('/profile')}        >
            <img src={selectedUser.image || dp} alt="" className='h-[100%] w-full object-cover'/>
          </div>
          <div  ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[rgb(23, 151, 194)] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0 shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
          {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
          {message && <span >{message}</span>}
          </div>
          
        </div>
  )
}

export default ReceiverMessage