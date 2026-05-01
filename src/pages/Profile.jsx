// 17
// 18 - cloudinary.js
// 16 - Home.jsx

// User can add profile photo
import React, { useRef, useState } from 'react'
import { IoCameraOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { serverurl } from "../main"
import dp from "../assets/emptydp.png"
import { setUserData } from '../redux/userSlice'

function Profile() {
    let {userData} = useSelector(state=>state.user)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFronendImage] = useState(userData.image || dp)
    let [saving, setSaving] = useState(false);
    let [backendImage, setBackendImage] = useState(null)
    let image = useRef()
    const handleImage = (e)=>{
        let file = e.target.files[0];
        setBackendImage(file)
        setFronendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e)=>{
        e.preventDefault();
        setSaving(true)
        try {
            // When we send image from frontend we send it to FormData(class) otherwise need to convert
            let formData = new FormData()
            formData.append("name", name)
            if(backendImage){
                formData.append("image", backendImage)
            }
            let result = await axios.put(`${serverurl}/api/user/profile`, formData, {withCredentials:true})
            setSaving(false)
            dispatch(setUserData(result.data))
            localStorage.setItem("userData", JSON.stringify(result.data)); // 👈 save it

        } catch (error) {
            console.log(error);
            setSaving(false)            
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
        <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={()=>navigate("/")}>
            <IoIosArrowRoundBack className='w-[50px] h-[50px]'/>
        </div>
        <div className='bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg relative cursor-pointer'
        onClick={()=>image.current.click()}>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center'
            >
                <img src={frontendImage} alt="" className='h-[100%] w-full object-cover'/>
            </div>
            <div className='absolute bottom-4 text-gray-700 right-4 w-[35px] h-[35px] rounded-full bg-[#20c7ff] flex justify-center items-center'>
                <IoCameraOutline className='text-gray-700 w-[25px] h-[25px] '/>
            </div>
        </div>
        <form action="" className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center '
        onSubmit={handleProfile}>
            <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
            <input type="text" 
            placeholder='Enter your name'
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff]  px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'
            onChange={(e)=>setName(e.target.value)}
            value={name}/>
            <input type="text" readOnly
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff]  px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]'
            disabled
            value={userData?.userName}/>
            <input type="text" readOnly
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff]  px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]'
            disabled
            value={userData?.email}/>
            <button className='px-[10px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner cursor-pointer'
            disabled={saving}
            onClick={()=>navigate('/')}>{saving? "Saving...":"Save Profile"}</button>
        </form>
    </div>
  )
}

export default Profile