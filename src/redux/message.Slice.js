// 30
// 31 - socket.js
// 29 - getMessages.jsx

// Slice to keep messages data

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[]
    },
    reducers:{
        setMessages:(state, action) => {
            state.messages.push = action.payload
        }
    }
})

export const {setMessages} = messageSlice.actions
export default messageSlice.reducer
