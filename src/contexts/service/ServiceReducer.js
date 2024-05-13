export const ServiceReducer = ( state, action ) => {

    switch ( action.type ) {
        case 'setServiceRequest':
            
            return {
                ...state,
                serviceRequest: action.payload
            }
    
        default:
            return state;
    }    

}