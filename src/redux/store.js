// 13
// 14 - userSlice.js
// 12 - user.routes.js  
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"
import messageSlice from "./message.Slice.js"

// Keeping different slices/boxes in store so someone can use it
export const store = configureStore({
    reducer:{
        user:userSlice,
        message:messageSlice
    }
})

//Contains different slices

// Redux Devtools - Chrome extensions helps to see slices/store in real time

// REDUX : In store, different boxes/slices, with different items that can be used in multiple files [Like context Api]

// Slice - 1 type ki categry jiske andar ussi category ka data store hota hai 

// useDispatch() hook - ki help se reducers ko access karte h and slice ke andar states mei change karte hai

// useSelector() hook - ki help se state ko access karte hai aur data get karte hai