export const mapTechnicianReducer = (state, action) => {
    switch(action.type) {
        case 'setTechnicianMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }

        default:
            return state;
    }
}