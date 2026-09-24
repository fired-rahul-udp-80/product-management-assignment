import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export function useAuth() {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    user,
    token,
    isAuthenticated,
    logout: () => dispatch(logout()),
  };  
}
