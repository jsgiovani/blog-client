import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dark:false
};

export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
       toggleTheme: (state)=>{
        state.dark = !state.dark;
       }
    },

});



export const { toggleTheme } = themeSlice.actions;


export default themeSlice.reducer;