import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { authApi } from '@/api/authApi';
import Logo from '@/components/shared-assets/Logo';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        const data = await authApi.login(email, password);
        localStorage.setItem('token', data.access_token);
        toast.success('Logged in successfully!');
        navigate('/app/');
      } else {
        await authApi.register(email, password);
        toast.success('Registration successful! Please log in.');
        setIsLogin(true);
        // Clear password on switch
        setPassword('');
      }
    } catch (error: any) {
      const message = error.response?.data?.detail || error.message || 'An error occurred';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="dark-panel rounded-3xl p-8 shadow-2xl noise-bg border border-white/5 relative overflow-hidden group">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-brand/20 blur-[60px] -z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 glow-brand-sm">
              <Logo className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-white/50 text-sm mt-2">
              {isLogin ? 'Enter your details to access your account' : 'Sign up to start managing your finances'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 gradient-brand text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword('');
              }}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
