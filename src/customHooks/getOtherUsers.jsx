// 22
// 23 - message.model.js
// 21 - MessageArea.jsx

// Custom hook to gather other users data

import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverurl } from "../main"
import { setOtherUsersData } from "../redux/userSlice"

const getOtherUsers = () => {
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverurl}/api/user/others`, {withCredentials:true})
                dispatch(setOtherUsersData(result.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
    }, [userData])
}

export default getOtherUsers