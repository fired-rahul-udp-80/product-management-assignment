import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely read initial authentication state from localStorage
const getInitialState = () => {
  let token = null;
  let user = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch {
        user = null;
      }
    }
  }

  return {
    token: token || null,
    user: user || null,
    isAuthenticated: !!token,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Save authentication details in Redux state & localStorage
    setCredentials: (state, action) => {
      const { token, accessToken, ...userData } = action.payload;
      const authToken = token || accessToken;

      state.token = authToken;
      state.user = userData;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    },

    // Clear authentication details from Redux state & localStorage
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    // Synchronize Redux auth state with browser localStorage on client mount
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          try {
            state.token = storedToken;
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = true;
          } catch {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
