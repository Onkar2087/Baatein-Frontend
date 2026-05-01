// 8
// 9 - login.jsx
// 7 - token.js 

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverurl } from '../main'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import logo from "../assets/logo.png"

function Signup() {
  const navigate = useNavigate()
  let [showPassword, setShowPassword] = useState(false)
  let [userName, setUserName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user);
    
  const handleSignup = async(e) => {
    e.preventDefault()
    setLoading(true);
    try {
      // withCrendentials - true => for cookies parsing
      let result = await axios.post(`${serverurl}/api/auth/signup`, {userName, email, password}, {withCredentials:true})  
      // dispatch - 1 tarah ka function [data ko set karne ke liye]
      // Uske andar milega 1 reducer jisko change karna hai
      // Uske andar vo data (payload) daalna hai jo update karana hai
      // result.data - jo bhi data signup karne ke baad ayega [name, email, password]
      dispatch(setUserData(result.data))
      navigate('/profile')
      setUserName("")
      setEmail("")
      setPassword("")
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setErr(error?.response?.data?.message)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-xl shadow-gray-400 shadow-lg flex flex-col gap-[10px] mx-5 md:mx-0'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center rounded-xl'>
          <h1 className='text-gray-600 font-bold flex text-[30px]'>Welcome to <span className='text-white flex'>
            <img src={logo} alt="" className='w-[50px]'/>
            aatein!</span></h1>
        </div>
        <form action="" className='w-full flex flex-col gap-[20px] items-center pt-[10px]'
        onSubmit={handleSignup}>
          <input type="text" placeholder='Username' name=""  className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'
          onChange={(e)=>setUserName(e.target.value)}
          value={userName}/>
          <input type="email" placeholder='Email' name="" className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]' 
          onChange={(e)=>setEmail(e.target.value)}
          value={email}/>
          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
            <input type={`${showPassword?"text":"password"}`} placeholder='Password' name=""  className={` w-full h-full outline-none px-[20px] py-[10px] bg-white rounded-lg text-gray-700 text-[19px]} `}
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>
            <span onClick={()=>{setShowPassword(prev=>!prev)}}>{`${showPassword?"hide":"show"}`}</span>
          </div>
          {err && <p className='text-red-500'>{`*${err}`}</p>}
          <button className='px-[10px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner cursor-pointer' disabled={loading}>{loading?"Loading":
            "Signup"}</button>
          <p className='cursor-pointer'
          onClick={()=>{navigate('/login')}}>Aready have an account ? <span className='text-[#20c7ff] text-bold'>Login</span></p>
      </form>
      </div>
    </div>
  )
}

export default Signup