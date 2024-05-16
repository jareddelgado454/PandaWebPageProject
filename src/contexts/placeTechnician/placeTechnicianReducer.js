export const placeTechnicianReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'setTechnicianLocation':
            
            return {
                ...state,
                isLoading: false,
                technicianLocation: action.payload
            }
    
        default:
            return state;
    }    

}