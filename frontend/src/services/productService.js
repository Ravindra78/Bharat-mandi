import { apiFetch } from './api';

export const createListingService = (formData) => apiFetch('/products', { method: 'POST', body: formData });
export const getAllListingsService = () => apiFetch('/products');
export const searchListingsService = (query) => apiFetch(`/products/search?q=${query}`);
