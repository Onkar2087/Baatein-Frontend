import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import getOtherUsers from './customHooks/getOtherUsers'
import {io} from "socket.io-client"
import { serverurl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

function App() {
  // Jaise hi user aayega - redux devtools mei data aa jayega
  getCurrentUser()
  getOtherUsers()
  let {userData, socket, onlineUsers} = useSelector(state=>state.user);
  let dispatch = useDispatch()

  // io ke through hum backend ka use karte hai multiplexing ke liye [multiplexing - user ko connect kar rahe hai apas mei (frontend-backend)]
  useEffect(()=>{
    if(userData){
      // connection established
        // jaise hi user connect hoga toh, query ke naam par kuch bhi bhej sakte hai - through handshake method

      const socketio = io(`${serverurl}`, {
      auth: {
        token: localStorage.getItem("token")
      }
    });
      dispatch(setSocket(socketio))
      socketio.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users))
      })
      return ()=> socketio.close()
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket)
      }
    }
  }, [userData])
  return (
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to={"/"}/>}/>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/profile"}/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App