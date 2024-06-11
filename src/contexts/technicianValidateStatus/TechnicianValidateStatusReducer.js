export const initialState = {
    isOnline: false,
    stripeStatus: null,
    technicianStatus: null,
    loading: true,
    error: null,
  };
  
  const TechnicianStatusReducer = (state, action) => {
    switch (action.type) {
      case 'SET_IS_ONLINE':
        return { ...state, isOnline: action.payload };
      case 'SET_STRIPE_STATUS':
        return { ...state, stripeStatus: action.payload };
      case 'SET_TECHNICIAN_STATUS':
        return { ...state, technicianStatus: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default TechnicianStatusReducer;