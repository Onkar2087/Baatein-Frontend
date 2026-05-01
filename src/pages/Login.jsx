// 9
// 10 - isAuth.js
// 8 - Signup.jsx

import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverurl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'
import logo from "../assets/logo.png"

function Login() {
  const navigate = useNavigate()
  let [showPassword, setShowPassword] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("")
  let dispatch = useDispatch()
  
  
  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true);
    try {
      // withCrendentials - true => for cookies parsing
      let result = await axios.post(`${serverurl}/api/auth/login`, {email, password}, {withCredentials:true})  
      dispatch(setUserData(result.data))
      dispatch(setSelectedUser(result.data))
      navigate("/")
      setEmail("")
      setPassword("")   
      setLoading(false)   
    } catch (error) {
        console.log("Login failed:", error.response?.data?.message || error.message);
        setLoading(false)
        setErr(error?.response?.data?.message)
    }

  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-xl shadow-gray-400 shadow-lg flex flex-col gap-[10px] mx-5 md:mx-0'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center rounded-xl'>
          <h1 className='text-gray-600 font-bold text-[30px] flex'>
            Login to <span className='text-white flex'>
              <img src={logo} alt="" className='w-[50px]'/>
              aatein!</span></h1>
        </div>
        <form action="" className='w-full flex flex-col gap-[20px] items-center pt-[10px]'
        onSubmit={handleLogin}>
          <input type="email" placeholder='Email' name="" className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]' value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
            <input type={`${showPassword?"text":"password"}`} placeholder='Password' name=""  className={` w-full h-full outline-none px-[20px] py-[10px] bg-white rounded-lg text-gray-700 text-[19px]} `}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <span className='cursor-pointer absolute top-[10px]  right-[20px] text-[#20c7ff]' onClick={()=>{setShowPassword(prev=>!prev)}}>{`${showPassword?"hide":"show"}`}</span>
          </div>

          {err && <p className='text-red-500'>{`*${err}`}</p>}
          <button className='px-[10px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner cursor-pointer' disabled={loading}>{loading?"Loading..." : "Login"}</button>
          <p className='cursor-pointer'
          onClick={()=>{navigate('/signup')}}>Want to create a new account ? <span className='text-[#20c7ff] text-bold'>Signup</span></p>
      </form>
      </div>
    </div>
  )
}

export default Login