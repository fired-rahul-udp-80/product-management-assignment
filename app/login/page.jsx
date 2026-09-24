"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/authService';
import { setCredentials } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export default function LoginPage() {
  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // UI state for error messaging & loading status
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill all the fields")
      return;
    }
    setIsLoading(true);

    try {
      const data = await authService.login({
        username: username.trim(),
        password: password.trim(),
      });
      const token = data.accessToken || data.token;
      if (token) {
        dispatch(setCredentials(data));
        toast.success("Login Successful")
        router.push('/products');
      } else {
        toast.error('Login failed. Token not returned by server.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  };

  // Helper button to auto-fill valid DummyJSON testing credentials
  const handleAutoFill = () => {
    setUsername('emilys');
    setPassword('emilyspass');
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 space-y-6">
        
        {/* Card Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-100">Admin Login</h1>
          <p className="text-slate-400 text-sm">
            Sign in to access the Product Management Dashboard
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 flex items-center justify-between">
          <div>
            <span className="text-cyan-400 font-semibold block">Test Credentials:</span>
            <span>User: <strong className="text-slate-200">emilys</strong> | Pass: <strong className="text-slate-200">emilyspass</strong></span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            disabled={isLoading}
            className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded text-xs transition disabled:opacity-50"
          >
            Auto-fill
          </button>
        </div>

        {/* User-Friendly Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-950/60 border border-red-800/80 text-red-200 text-sm rounded-xl flex items-start space-x-2">
            <span className="text-base">⚠️</span>
            <p className="mt-0.5">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              placeholder="Enter your username"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Enter your password"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed font-semibold text-white rounded-lg transition shadow-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
