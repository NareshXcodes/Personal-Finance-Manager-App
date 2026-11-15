import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { authApi } from '@/api/authApi';
import Logo from '@/components/shared-assets/logo.jpg';

export default function Register() {
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
      await authApi.register(email, password);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.detail || error.message || 'An error occurred';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F8F5] p-5 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_78%_0%,rgba(45,212,191,0.2),transparent_38%),linear-gradient(180deg,#f4fbf8_0%,#f7f8f5_0%,#f7f8f5_78%)]" />
      <div className="w-full max-w-md animate-scale-in">
        <div className="relative rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,118,110,0.12)] sm:rounded-[2rem] sm:p-9">
          <div className="mb-8 flex flex-col items-center text-center">
            <img src={Logo} alt="Personal Finance Manager logo" className="mb-5 h-auto w-48 max-w-[72vw] object-contain sm:mb-6 sm:w-56" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-dark">Start with clarity</p>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">
              Create your workspace
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign up to start managing your finances
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand sm:py-3"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand sm:py-3"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-200 hover:bg-brand-dark hover:shadow-[0_0_20px_rgba(13,148,136,0.25)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                navigate('/login');
              }}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-dark"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
