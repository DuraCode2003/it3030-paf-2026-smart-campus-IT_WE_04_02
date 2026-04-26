import React, { createContext, useState, useCallback, useEffect } from 'react';
import { ROLES } from '../data';

export const AuthContext = createContext();

// Decode a JWT payload without a library
function parseJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (_) {
    return null;
  }
}

// Map backend role string → frontend ROLES constant
function mapRole(backendRole) {
  if (!backendRole) return ROLES.STUDENT;
  const r = backendRole.toUpperCase();
  if (r === 'ADMIN')      return ROLES.ADMIN;
  if (r === 'TECHNICIAN') return ROLES.TECHNICIAN;
  if (r === 'LECTURER')   return ROLES.LECTURER;
  return ROLES.STUDENT; // STUDENT + any unknown → STUDENT
}

function buildUserFromToken(token) {
  const payload = parseJwt(token);
  if (!payload) return null;
  return {
    id:         payload.userId,
    email:      payload.sub,
    name:       payload.name || payload.sub?.split('@')[0] || 'User',
    initials:   (payload.name || payload.sub || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    role:       mapRole(payload.role),
    department: 'Faculty of Computing',
    picture:    payload.picture || '',
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Check for token in URL query param (OAuth2 redirect callback)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem('sc_token', urlToken);
      // Remove token from URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }

    // 2. Load from localStorage
    const token = localStorage.getItem('sc_token');
    if (token) {
      const user = buildUserFromToken(token);
      if (user) setCurrentUser(user);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    // Redirect to backend Google OAuth2 entry point
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sc_token');
    setCurrentUser(null);
    window.location.href = '/';
  }, []);

  // Dev convenience: allow switching to a mock user in dev mode only
  const switchRole = useCallback((role) => {
    if (!import.meta.env.DEV) return;
    setCurrentUser(prev => prev ? { ...prev, role } : null);
  }, []);

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    switchRole,
    isStudent:    currentUser?.role === ROLES.STUDENT,
    isLecturer:   currentUser?.role === ROLES.LECTURER,
    isAdmin:      currentUser?.role === ROLES.ADMIN,
    isTechnician: currentUser?.role === ROLES.TECHNICIAN,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
