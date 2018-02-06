const API_ROOT = `http://localhost:3000/api`;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

const getWithToken = url => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: { Authorization: token }
  }).then(res => res.json());
};

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`);
};

const getListings = () => {
  return getWithToken(`${API_ROOT}/listings`);
};

const login = data => {
  return fetch(`${API_ROOT}/login/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const register = data => {
  return fetch(`${API_ROOT}/users/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const createListing = data => {
  const token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/listings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const createMessage = data => {
  const token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/messages/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const deleteListing = id => {
  const token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/listings/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token }
  }).then(res => res.json());
};

export const adapter = {
  auth: {
    login,
    getCurrentUser,
  },
  register,
  createListing,
  deleteListing,
  getListings,
  createMessage
};
