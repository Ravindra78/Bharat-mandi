const API_URL = process.env.REACT_APP_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  // Agar body FormData hai → Content-Type mat set karo
  const headers = {
    ...options.headers,
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { 'x-auth-token': token } : {}),
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMsg = 'API error';
    try {
      const data = await response.json();
      if (data.msg) errorMsg = data.msg;
    } catch (err) {
      // ignore parse error
    }
    throw new Error(errorMsg);
  }

  return response.json();
};
