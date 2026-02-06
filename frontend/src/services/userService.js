import { apiFetch } from './api';

export const loginService = (data) => apiFetch('/users/login', { method: 'POST', body: JSON.stringify(data) });
export const registerService = (data) => apiFetch('/users/register', { method: 'POST', body: JSON.stringify(data) });
export const verifyKycService = (data) => apiFetch('/users/kyc', { method: 'POST', body: JSON.stringify(data) });