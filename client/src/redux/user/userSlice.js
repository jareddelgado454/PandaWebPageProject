import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInRedux : (state, action) => {
            console.log("desde redux slice", action)
            state.currentUser = action.payload;
        },
        signOutRedux : (state) => {
            state.currentUser = null;
        }
    },
  })

  export const { signInRedux, signOutRedux } = userSlice.actions;

  export default userSlice.reducer;