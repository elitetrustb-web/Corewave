import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useAppState } from '../contexts/AppStateContext';

export default function LoginPage() {
  const { login, navigate } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-full bg-[#0B1120] flex flex-col px-6 py-8">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mt-12 mb-10"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
          <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
            <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M20 28c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="20" r="2" fill="white" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Core<span className="text-blue-500">Wave</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 tracking-widest uppercase">Bank</p>
      </motion.div>

      {/* Form Section */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onSubmit={handleLogin}
        className="flex flex-col gap-4"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-400 text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-[#1E293B] border border-slate-700 rounded-xl pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-400 text-sm font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-[#1E293B] border border-slate-700 rounded-xl pl-11 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Sign In'
          )}
        </motion.button>

        {/* Create Account Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('accountRequest')}
          className="w-full h-12 bg-[#1E293B] hover:bg-[#263449] text-white font-semibold rounded-xl transition-colors border border-slate-700"
        >
          Create Account
        </motion.button>

        {/* Admin hint */}
        <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-xs">
          <Shield className="w-4 h-4" />
          <span>Admin: admin@corewave.com / any password</span>
        </div>
        <div className="flex items-center justify-center text-slate-500 text-xs">
          <span>User: joshua@corewave.com / any password</span>
        </div>
      </motion.form>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-8 text-center"
      >
        <p className="text-slate-600 text-xs">
          Secured by 256-bit encryption
        </p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-emerald-500 text-xs">System Online</span>
        </div>
      </motion.div>
    </div>
  );
}
