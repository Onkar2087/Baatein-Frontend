// 20
// 21 - MessageArea.jsx
// 19 - multer.js 
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import emptydp from "../assets/emptydp.png"
import { IoIosSearch } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverurl } from '../main'
import { setOtherUsersData, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice'

function Sidebar() {
    let {userData, otherUsers, selectedUser,onlineUsers, searchData} = useSelector(state=>state.user)
    let [search, setSearch] = useState(false)
    let [input, setInput] = useState("")
    let dispatch = useDispatch()
    let navigate = useNavigate()

    // Handle Logout - Analogy :
    // Imagine you have a library card to borrow books.

    // Logging out is like going to the librarian and saying, "I’m done for today, please cancel my card."

    // The librarian removes your name from the "current visitors" list (server logout).

    // You also take your card back from your wallet and put it away (clearing user data in the app).

    // Then, you leave the library and stand outside where new visitors go (redirect to login page).
    const handLogOut = async () => {
      try {
        // It sends a message to your backend at /api/auth/logout asking it to log the user out.
        let result = await axios.get(`${serverurl}/api/auth/logout`, {withCredentials:true})
        if (socket) {
          socket.emit("logout")
          socket.disconnect()
        }
        // Forget who the logged-in user is in the app.
        dispatch(setUserData(null))
        // Also clear the list or data about other users you might have loaded.
        dispatch(setOtherUsersData(null))
        // Take the user on to the login page
        navigate("/login")
      } catch (error) {
        console.log(error);
        
      }
    }
    const handleSearch = async () => {
      try {
        let result = await axios.get(`${serverurl}/api/user/search?query=${input}`, {withCredentials:true})
        dispatch(setSearchData(result.data))
        
    
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>{
      if(input){
        handleSearch()
      }
    }, [input])
  return (
    <div className={`l g:w-[30%] overflow-hidden w-full lg:block h-full relative bg-slate-200 ${!selectedUser? "block" :"hidden"}`}>

        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer fixed bottom-[20px] left-[10px] bg-[#20c7ff] text-white' onClick={handLogOut}>
              <BiLogOut className='w-[25px] h-[25px]'/>
        </div>

        {input.length>0 && <div className='flex absolute top-[250px] bg-white w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] z-[150] shadow-lg'>
          {searchData?.map((user)=>(
            <div>
              <div className='w-[95%] h-[70px] px-[10px] flex items-center gap-[20px]  hover:bg-[#78cae5] border-b-2 border-gray-400 cursor-pointer'
              onClick={()=>{dispatch(setSelectedUser(user))
                setInput("")
              }}>
                <div className='relative rounded-full shadow-gray-500 bg-white flex justify-center items-center mt-[10px]'>
              <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center shadow-gray-500 shadow-lg bg-white'
            >
                <img src={user.image || emptydp} alt="" className='h-[100%] w-full object-cover'/>
                
                </div>
                {onlineUsers?.includes(user._id) &&
                <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
              </div>
                      </div>
                    ))}
                  </div>}

                  
        <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center flex-col gap-[10px] px-[20px]'>
          <h1 className='text-white font-bold text-[25px]'>Baatein</h1>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-gray-800 font-bold text-[25px]'>Hi, {userData.name || "user"}</h1>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer bg-white'
            onClick={()=>navigate('/profile')}
            >
                <img src={userData.image || emptydp} alt="" className='h-[100%] w-full object-cover'/>
            </div>
          </div>
          <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'> 
            {!search && <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-white cursor-pointer'
            onClick={()=> setSearch(true)}
            > 
              <IoIosSearch className='w-[25px] h-[25px]'/>
            </div>}
              
            {search && 
              <form action="" className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full px-[20px] relative'>
                <IoIosSearch className='w-[25px] h-[25px] mr-3 cursor-pointer'/>
                <input type="text" placeholder='Search users...' 
                className='w-full h-full p-[10px] border-0 text-[17px]' 
                onChange={(e)=>setInput(e.target.value)}
                value={input}/>
                <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)} />
                  
              </form>
            }

            <div className='flex gap-[20px]'>
              {!search && otherUsers?.map((user)=>(
                onlineUsers?.includes(user._id) &&
              <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px] cursor-pointer'
              onClick={()=>dispatch(setSelectedUser(user))}>
              <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center shadow-gray-500 shadow-lg bg-white'>
                <img src={user.image || emptydp} alt="" className='h-[100%] w-full object-cover'/>
                
                </div>
                <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
            </div>
            ))} 
            </div>
          </div>
        </div>

        
        <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
          {otherUsers?.map((user)=>(
              <div className='w-[95%] h-[60px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b2ccdf] cursor-pointer'
              onClick={()=>dispatch(setSelectedUser(user))}>
                <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px]'>
              <div className='w-[60px] h-[60px] rounded-full flex justify-center items-center shadow-gray-500 shadow-lg bg-white'
            >
                <img src={user.image || emptydp} alt="" className='h-[100%] w-full object-cover'/>
                
                </div>
                {onlineUsers?.includes(user._id) &&
                <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
              </div>
            ))} 
        </div>
    </div>
  )
}

export default Sidebar
