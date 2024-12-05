export const ScheduledReducer = (state, action) => {
    switch (action.type) {
        case 'setScheduledService':
            return {
                ...state,
                scheduledService: action.payload
            };
            case 'updateScheduledCoordinates':
                return {
                    ...state,
                    serviceRequest: {
                        ...state.serviceRequest,
                        destLatitude: action.payload.destLatitude,
                        destLongitude: action.payload.destLongitude
                    }
            };
        default:
            return state;
    }
};