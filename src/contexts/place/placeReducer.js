export const placeReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'setUserLocation':
            
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
    
        default:
            return state;
    }    

}