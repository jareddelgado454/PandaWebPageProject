import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInRedux : (state, action) => {
            state.currentUser = action.payload;
        },
        signOutRedux : (state, action) => {
            state.currentUser = null;
        }
    },
  })

  export const { signInRedux, signOutRedux } = userSlice.actions;

  export default userSlice.reducer;