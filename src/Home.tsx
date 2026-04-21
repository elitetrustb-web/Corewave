import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, TrendingUp, Landmark, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import BlueprintGlobe from '@/components/BlueprintGlobe';
import { initializeStore, getUserByEmail, setSession, generateId, generateOtp } from '@/lib/store';

type LoginMode = 'user' | 'otp';

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showOtpDisplay, setShowOtpDisplay] = useState(false);

  initializeStore();

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = getUserByEmail(email);
    if (!user) {
      setError('Invalid credentials. Please check your email.');
      return;
    }
    if (password !== user.pin) {
      setError('Invalid PIN. Please try again.');
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setShowOtpDisplay(true);
    setMode('otp');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email !== 'controladmin@panel' || password !== '0000') {
      setError('Invalid admin credentials.');
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setShowOtpDisplay(true);
    setMode('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpCode !== generatedOtp) {
      setError('Invalid verification code. Please try again.');
      return;
    }

    if (email === 'controladmin@panel') {
      const session = {
        role: 'admin' as const,
        email: 'controladmin@panel',
        token: generateId('tkn'),
        expiresAt: Date.now() + 3600000,
      };
      setSession(session);
      navigate('/admin');
    } else {
      const user = getUserByEmail(email);
      if (user) {
        const session = {
          role: 'user' as const,
          userId: user.id,
          email: user.email,
          token: generateId('tkn'),
          expiresAt: Date.now() + 3600000,
        };
        setSession(session);
        navigate('/dashboard');
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#001233]">
      {/* Navigation */}
      <nav className="h-20 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-[#3A86FF]" />
          <div className="text-white text-xl tracking-wider">
            <span className="font-bold">ATLAS</span>
            <span className="font-light ml-1">LEDGER</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <span className="text-white/80">Business Banking</span>
          <span>Institutional Trading</span>
          <span>Global Transfers</span>
          <span>Crypto Services</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative min-h-[600px] flex">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001233] via-[#001845] to-[#001233]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 px-6 lg:px-12 py-16 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
              Global Financial
              <br />
              Network
            </h1>
            <p className="text-lg text-white/60 max-w-md">
              Real-time business banking, institutional trading, and secure
              multi-currency accounts for enterprises worldwide.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-[#2A9D8F] text-sm">
                <Shield className="w-5 h-5" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A86FF] text-sm">
                <TrendingUp className="w-5 h-5" />
                <span>Real-Time Trading</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Landmark className="w-5 h-5" />
                <span>FDIC Insured</span>
              </div>
            </div>
          </div>

          {/* Right - Globe */}
          <div className="h-[400px] lg:h-[500px] relative">
            <BlueprintGlobe />
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="bg-[#EDF2FB] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#001845] mb-4">
                  Institutional-Grade Banking
                </h2>
                <p className="text-[#5C677D]">
                  AtlasLedger provides comprehensive financial services for
                  businesses, including multi-currency accounts, wire transfers,
                  crypto trading, and loan facilities.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Total Assets Managed', value: formatCurrency(2847500000) },
                  { label: 'Active Business Accounts', value: '48,392' },
                  { label: 'Daily Transaction Volume', value: formatCurrency(126000000) },
                  { label: 'Countries Supported', value: '142' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white p-6 border-t-2 border-[#001845]"
                  >
                    <p className="text-xs text-[#8D99AE] uppercase tracking-wider mb-2">
                      {stat.label}
                    </p>
                    <p className="text-xl font-semibold text-[#001845]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <div className="bg-white p-8 shadow-lg">
              {/* Tabs */}
              <div className="flex border-b border-[#DEE2E6] mb-6">
                <button
                  onClick={() => {
                    setMode('user');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    mode === 'user' || mode === 'otp'
                      ? 'border-[#001845] text-[#001845]'
                      : 'border-transparent text-[#8D99AE] hover:text-[#5C677D]'
                  }`}
                >
                  Business Login
                </button>
                <button
                  onClick={() => {
                    setMode('user');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    mode === 'admin'
                      ? 'border-[#001845] text-[#001845]'
                      : 'border-transparent text-[#8D99AE] hover:text-[#5C677D]'
                  }`}
                >
                  Admin Portal
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-[#E63946]/10 text-[#E63946] text-sm mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {showOtpDisplay && generatedOtp && (
                <div className="p-4 bg-[#2A9D8F]/10 border border-[#2A9D8F] mb-4">
                  <p className="text-xs text-[#5C677D] uppercase tracking-wider mb-1">
                    Verification Code
                  </p>
                  <p className="text-3xl font-mono font-bold text-[#001845] tracking-[0.5em]">
                    {generatedOtp}
                  </p>
                  <p className="text-xs text-[#8D99AE] mt-2">
                    Enter this code below to complete authentication
                  </p>
                </div>
              )}

              {mode === 'otp' ? (
                <form onSubmit={handleOtpVerify} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#5C677D] uppercase tracking-wider mb-2">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-full px-4 py-3 border border-[#DEE2E6] bg-[#F8F9FA] text-[#001845] font-mono text-lg tracking-[0.3em] text-center focus:outline-none focus:border-[#001845]"
                      maxLength={6}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#001233] text-white text-sm font-medium hover:bg-[#001845] transition-colors"
                  >
                    Verify & Access Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('user');
                      setOtpCode('');
                      setGeneratedOtp('');
                      setShowOtpDisplay(false);
                    }}
                    className="w-full py-3 text-[#5C677D] text-sm hover:text-[#001845] transition-colors"
                  >
                    Back to Login
                  </button>
                </form>
              ) : mode === 'user' ? (
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#5C677D] uppercase tracking-wider mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 border border-[#DEE2E6] bg-[#F8F9FA] text-[#001845] focus:outline-none focus:border-[#001845]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C677D] uppercase tracking-wider mb-2">
                      PIN Code
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your PIN"
                        className="w-full px-4 py-3 border border-[#DEE2E6] bg-[#F8F9FA] text-[#001845] focus:outline-none focus:border-[#001845] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D99AE]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#001233] text-white text-sm font-medium hover:bg-[#001845] transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Secure Login
                  </button>
                  <p className="text-xs text-center text-[#8D99AE]">
                    : joshuaturley59@gmail.com / PIN: 1234
                  </p>
                </form>
              ) : (
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#5C677D] uppercase tracking-wider mb-2">
                      Admin Email
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="controladmin@panel"
                      className="w-full px-4 py-3 border border-[#DEE2E6] bg-[#F8F9FA] text-[#001845] focus:outline-none focus:border-[#001845]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C677D] uppercase tracking-wider mb-2">
                      Admin Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="w-full px-4 py-3 border border-[#DEE2E6] bg-[#F8F9FA] text-[#001845] focus:outline-none focus:border-[#001845] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D99AE]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#001233] text-white text-sm font-medium hover:bg-[#001845] transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Access Control Panel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#001233] border-t border-white/10 py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#3A86FF]" />
            <span className="text-white/60 text-sm">
              AtlasLedger Business Financial Network
            </span>
          </div>
          <div className="text-white/40 text-xs">
            2026 AtlasLedger Financial Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
