export const userReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload
            }

        case 'Logout':
            return {
                ...state,
                user: null
            }
    
        default:
            return state;
    }
}