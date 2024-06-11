

export const initialState = {
    serviceAssigned: null,
    technicianActivityStatus: null,
    loading: true,
  };
  
  export const serviceAssignedReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SERVICE_ASSIGNED':
        return {
          ...state,
          serviceAssigned: action.payload,
          technicianActivityStatus: 'assigned',
          loading: false,
        };
      case 'SET_TECHNICIAN_ACTIVITY_STATUS':
        return {
          ...state,
          technicianActivityStatus: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      case "CLEAR_SERVICE_ASSIGNED":
        return {
          ...state,
          serviceAssigned: null,
          technicianActivityStatus: null,
          loading: false,
        };
      default:
        return state;
    }
  };