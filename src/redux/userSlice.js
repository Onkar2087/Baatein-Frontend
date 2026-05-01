// 14
// 15 - getCurrentUser.jsx
// 13 - store.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        // for other users
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUsers:[],
        searchData:null
    },
    reducers:{
        // state ke through hum initial state ko acess karte h 
        // setUserData("onkar") - will get in action.payload
        setUserData:(state, action) => {
            state.userData = action.payload;
        },
        // Setting data in other users
        setOtherUsersData:(state, action) => {
            state.otherUsers = action.payload
        },
        setSelectedUser:(state, action) => {
            state.selectedUser = action.payload
        },
        setSocket:(state, action) => {
            state.socket = action.payload
        },
        setOnlineUsers:(state, action) => {
            state.onlineUsers = action.payload
        },
        setSearchData:(state, action) => {
            state.searchData = action.payload
        }
    }
})

export const {setUserData, setOtherUsersData, setSelectedUser, setSocket, setOnlineUsers,setSearchData} = userSlice.actions
export default userSlice.reducer

// 3. How does dispatch(setUserData(result.data)) work?
// Layman's Explanation:

// dispatch is like telling Redux: "Hey, update the data in your storage!"

// setUserData(result.data) is a special message (we call it an action) that says: "Please set the user's data to this new value."

// When you call dispatch(setUserData(result.data)):

// Redux will take result.data and put it inside the userData slot of your Redux store, replacing null with the actual user info.

// Then every part of your app that uses this user data will automatically get the new data.
