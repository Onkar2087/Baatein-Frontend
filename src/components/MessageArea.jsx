// 21
// 22 - getOtherUsers.jsx
// 20 - Sidebar.jsx

import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import dp from "../assets/emptydp.png"
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import axios from 'axios'
import { setMessages } from '../redux/message.Slice'
import { RiEmojiStickerLine, RiSendPlane2Fill } from "react-icons/ri"
import { FaImages } from "react-icons/fa"
import { serverurl } from '../main'


function MessageArea() {
  let {selectedUser, userData, socket} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  let [emoji, setEmoji] = useState(false);
  let [input, setInput] = useState("")
  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  //  Reference to the hidden file input.
  let image = useRef()
  // Loads messages from Redux.
  let {messages} = useSelector(state=>state.message)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    // no image has been selected to send 
    if(input.length == 0 && backendImage == null){
      return
    }
    try {
      // Creates a FormData object (to send text and image together).
      // FormData is a special JavaScript object used for building key-value pairs to send data like a form through HTTP requests.

      // It’s especially useful when you want to send both text and files (like images) together in one request.

      // The data sent with FormData is formatted in a way (multipart/form-data) that servers understand well, especially for file uploads.
      let formData = new FormData()
      formData.append("message", input)
      if(backendImage){
        formData.append("image", backendImage)
      }
      // POSTs the message to the backend.
      let result = await axios.post(`${serverurl}/api/message/send/${selectedUser._id}`, formData, {withCredentials:true})
      // Adds the new message to Redux store.
      dispatch(setMessages([...messages, result.data]))
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error);
      
    }
  }
  const onEmojiCLick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    // setEmoji(false);
  }

  // Stores the file for backend upload (backendImage) and creates a URL for preview (frontendImage).
  const handleImage = (e)=>{
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file))
  }

  // When a new message is received on the socket, pushes it to Redux.
  // Cleans up the socket listener when the component unmounts.
  // Updating newMessages array
  useEffect(()=>{
    socket.on("newMessage", (mess)=>{
      dispatch(setMessages([...messages, mess]))
    })
    return ()=>socket.off("newMessage")
  }, [messages, setMessages])

  return (
    <div className={`lg:w-[70%] ${selectedUser? "flex":"hidden"}  md:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
      {selectedUser && 
      <div className='flex flex-col w-full h-[100vh]'>
      <div className='w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg gap-[20px] flex items-center px-[20px]'>
        <div className='cursor-pointer' onClick={()=>dispatch(setSelectedUser(null))}>
          <IoIosArrowRoundBack className='w-[40px] h-[40px] text-white'/>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg'>
          <img src={selectedUser?.image || dp} alt="" className='h-[100%]'/>
        </div>
        <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>
      </div>
      <div className='w-full h-[70%] flex flex-col py-[30px] px-[20px] overflow-auto gap-[20px]'> 
        {emoji && 
        <div className='absolute bottom-[120px] left-[20px]'>
          <EmojiPicker width={250} height={350} 
          className='shadow-lg z-[100]' onEmojiClick={onEmojiCLick}/>
        </div>
        }
        {messages && messages?.map((mess)=>(
          mess.sender == userData._id? <SenderMessage image={mess.image} message = {mess.message}/> : <ReceiverMessage image={mess.image} message = {mess.message}/>
        ))}
      </div>
      </div>}

      {!selectedUser && 
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Baatein!</h1>
        <span className='text-gray-700 font-semibold text-[30px]'>Chat Friendly</span>
      </div>
      }
      
      {selectedUser && <div className='w-full lg:w-[70%] h-[100px] foxed bottom-[100px] flex items-center justify-center'>
        <img src={frontendImage} alt="" className='w-[80px] absolute top-[-50px] right-[20%] rounded-lg shadow-gray-400 shadow-lg'/>
        <form action="" className='w-[95%] max-w-70% h-[60px] bg-[rgb(23, 151, 194)] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]'
        onSubmit={handleSendMessage}>
          
          <div onClick={()=>setEmoji(prev=>!prev)}>
            <RiEmojiStickerLine className = 'w-[25px] h-[25px] text-white cursor-pointer'/>
          </div>
          <input type="file" accept='image/*' hidden ref={image} onChange={handleImage}/>
          <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white bg-transparent placeholder:white'placeholder='Message' onChange={(e)=>setInput(e.target.value)} value={input}/>
          // image.current.click() - to upload a image
          <div onClick={()=>image.current.click()}>
                        <FaImages className='w-[25px] h-[25px] text-white cursor-pointer'/>
          </div>
          {input.length>0 || backendImage != null &&  <button>
            <RiSendPlane2Fill className='w-[25px] h-[25px] text-white cursor-pointer'/>
          </button>}
        </form>
      </div>}
      

    </div>
  )
}

export default MessageArea
