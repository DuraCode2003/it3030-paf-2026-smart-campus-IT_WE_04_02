import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT + custom identity headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Decode JWT payload to get userId and role without a library
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.userId) config.headers['X-User-Id'] = payload.userId;
      if (payload.role)   config.headers['X-User-Role'] = payload.role;
    } catch (_) {
      // malformed token — skip extra headers
    }
  }
  return config;
});

// Response interceptor — redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sc_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Resources ────────────────────────────────────────────────────────────────
export const resourcesApi = {
  getAll:   (params) => api.get('/resources', { params }),
  getById:  (id)     => api.get(`/resources/${id}`),
  create:   (data)   => api.post('/resources', data),
  update:   (id, data) => api.put(`/resources/${id}`, data),
  delete:   (id)     => api.delete(`/resources/${id}`),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const bookingsApi = {
  getAll:       (params)           => api.get('/bookings', { params }),
  getById:      (id)               => api.get(`/bookings/${id}`),
  create:       (data)             => api.post('/bookings', data),
  approve:      (id, note = '')    => api.patch(`/bookings/${id}/approve`, { note }),
  reject:       (id, note)         => api.patch(`/bookings/${id}/reject`, { note }),
  cancel:       (id)               => api.patch(`/bookings/${id}/cancel`),
};

// ─── Tickets ──────────────────────────────────────────────────────────────────
export const ticketsApi = {
  getAll:       (params)              => api.get('/tickets', { params }),
  getById:      (id)                  => api.get(`/tickets/${id}`),
  create:       (data)                => api.post('/tickets', data),
  updateStatus: (id, status, notes)   => api.patch(`/tickets/${id}/status`, null, { params: { status, notes } }),
  assign:       (id, technicianId)    => api.patch(`/tickets/${id}/assign`, null, { params: { technicianId } }),
  addComment:   (id, content)         => api.post(`/tickets/${id}/comments`, { content }),
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationsApi = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
};
