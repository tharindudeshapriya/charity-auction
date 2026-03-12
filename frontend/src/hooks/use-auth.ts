"use client"

import { useState, useEffect } from 'react';
import { UserRole, MOCK_USERS } from '@/app/lib/mock-data';

export function useAuth() {
  const [user, setUser] = useState<{id: string, name: string, email: string, role: UserRole} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or a session
    const savedUser = localStorage.getItem('communibid_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const mockUser = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[2];
    setUser(mockUser);
    localStorage.setItem('communibid_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('communibid_user');
  };

  return { user, login, logout, loading };
}