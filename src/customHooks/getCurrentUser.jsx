// 15
// 16 - Home.jsx
// 14 - userSlice.js

// Custom Hooks - [utility functions] functions that we can use again and again
// Function to fetch current user details

import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverurl } from "../main"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    // UseEffect ke andar - jab-jab page reload hoga, tab -tab ye chalega
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverurl}/api/user/current`, {withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    }, [])
}

export default getCurrentUser