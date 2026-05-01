// 29
// 30 - message.Slice.js
// 28 - ReceiverMessage.jsx

// To get all the messages

import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverurl } from "../main"
import { setOtherUsersData } from "../redux/userSlice"
import { setMessages } from "../redux/message.Slice"

const getMessage = () => {
    let dispatch = useDispatch()
    let {userData, selectedUser} = useSelector(state=>state.user)
    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const res = await axios.get(
                `${serverurl}/api/message/get/${selectedUser._id}`,
                { withCredentials: true }
            )
        dispatch(setMessages(res.data))
        } catch (err) {
                console.log(err)
            }
        }

        if (selectedUser) {
            fetchMessages()
        }
    }, [selectedUser])
}

export default getMessage