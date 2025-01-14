export const ServiceReducer = (state, action) => {
    switch (action.type) {
        case 'setServiceRequest':
            return {
                ...state,
                serviceRequest: action.payload
            };
        case 'updateServiceCoordinates':
            return {
                ...state,
                serviceRequest: {
                    ...state.serviceRequest,
                    destLatitude: action.payload.destLatitude,
                    destLongitude: action.payload.destLongitude
                }
            };
        case 'updateService':
            return {
                ...state,
                serviceRequest: {
                    ...state.serviceRequest,
                    ...action.payload
                }
            }
        default:
            return state;
    }
};