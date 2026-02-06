import { loginService, registerService, verifyKycService } from '../../services/userService';

// LOGIN
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await loginService(credentials);
    localStorage.setItem('token', res.token); // save JWT
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.user });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err.message });
  }
};

// REGISTER
export const register = (data) => async (dispatch) => {
  try {
    const res = await registerService(data);
    localStorage.setItem('token', res.token); // save JWT
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.user });
  } catch (err) {
    dispatch({ type: 'REGISTER_FAIL', payload: err.message });
  }
};

// VERIFY KYC
export const verifyKyc = (data) => async (dispatch) => {
  try {
    const user = await verifyKycService(data); // service returns user directly
    dispatch({ type: 'KYC_SUCCESS', payload: user });
  } catch (err) {
    dispatch({ type: 'KYC_FAIL', payload: err.message });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
