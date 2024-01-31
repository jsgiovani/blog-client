import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    error:null,
    loading:false
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true;
            state.error = null; 
        },
        loginSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        loginFailure:(state, action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = action.payload
        },
        updateStart:(state) => {
           state.loading = true;
           state.error = false
        },

        updateSucces:(state, action)=>{
            state.currentUser = action.payload;
            state.error = false;
            state.loading = false
        },

        updateFailure:(state,action)=>{
            state.error = action.payload,
            state.loading = false;
        }

    },

});



export const {loginStart, loginSuccess, loginFailure, updateStart, updateSucces, updateFailure} = userSlice.actions;


export default userSlice.reducer;