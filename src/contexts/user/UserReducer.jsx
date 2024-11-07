export const userReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload
            }
        case 'setToken':
            return {
                ...state,
                expiredAt: action.payload
            }
        case 'Logout':
            return {
                ...state,
                user: null,
                expiredAt: null
            }
        
        case 'refreshToken':
            return {
                ...state,
                expiredAt: action.payload
            }
        default:
            return state;
    }
}