const initialState = { user: null, isAuthenticated: false, error: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'KYC_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, error: null };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'KYC_FAIL':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};