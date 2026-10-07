import { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  promptMessage?: string | null;
}

export function AuthModal({ isOpen, onClose, onSuccess, promptMessage }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateInput = () => {
    setErrorMessage(null);
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setErrorMessage('이메일 주소를 입력해 주세요.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('올바른 이메일 주소 형식으로 입력해 주세요. (예: user@example.com)');
      return false;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMessage('성함(이름)을 입력해 주세요.');
        return false;
      }
    }

    if (!trimmedPassword) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return false;
    }

    if (trimmedPassword.length < 6) {
      setErrorMessage('비밀번호가 너무 짧아요. 최소 6자 이상 입력해 주세요.');
      return false;
    }

    if (mode === 'signup') {
      if (trimmedPassword !== passwordConfirm.trim()) {
        setErrorMessage('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) return;

    setIsLoading(true);
    setErrorMessage(null);

    const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
    const payload =
      mode === 'signup'
        ? { email: email.trim(), password: password.trim(), name: name.trim() }
        : { email: email.trim(), password: password.trim() };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '로그인/회원가입에 실패했습니다.');
      }

      onSuccess(data.user);
    } catch (err: any) {
      console.error('Auth error:', err);
      setErrorMessage(err.message || '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick helper to fill test user '정현정'
  const handleQuickLoginTest = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'hyunjung@example.com',
          password: 'password123'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSuccess(data.user);
    } catch (err: any) {
      console.error(err);
      // Fallback
      onSuccess({
        id: 'user-1',
        name: '정현정',
        email: 'hyunjung@example.com'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 bg-[#FAF7F0] border-b border-[#E8DFC8] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#2A5C41] bg-[#E5EFE7] px-2.5 py-0.5 rounded-md">
              회원 전용 서비스
            </span>
            <h3 className="text-2xl font-black text-[#1C2E22] mt-1">
              {mode === 'login' ? '로그인' : '간편 회원가입'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Notice if redirected from Order button */}
        {promptMessage && (
          <div className="bg-[#EBF3ED] border-b border-[#D2E4D8] px-6 py-3 text-sm font-semibold text-[#25543A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E5A44] shrink-0" />
            <span>{promptMessage}</span>
          </div>
        )}

        {/* Mode Tabs */}
        <div className="flex border-b border-[#E8DFC8] bg-[#F7F2E7]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-base font-extrabold text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-[#FDFBF7] text-[#1C2E22] border-b-2 border-[#2E5A44]'
                : 'text-[#677A6B] hover:text-[#1C2E22]'
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-base font-extrabold text-center transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#FDFBF7] text-[#1C2E22] border-b-2 border-[#2E5A44]'
                : 'text-[#677A6B] hover:text-[#1C2E22]'
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name Field (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-[#3B4E40] mb-1">
                성함 (이름) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88988B]" />
                <input
                  type="text"
                  placeholder="예: 정현정"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-[#3B4E40] mb-1">
              이메일 주소 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88988B]" />
              <input
                type="email"
                placeholder="예: hyunjung@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-[#3B4E40]">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <span className="text-xs font-semibold text-[#667768]">
                (6자 이상)
              </span>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88988B]" />
              <input
                type="password"
                placeholder="비밀번호 6자 이상 입력"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
              />
            </div>
          </div>

          {/* Password Confirm Field (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-[#3B4E40] mb-1">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88988B]" />
                <input
                  type="password"
                  placeholder="비밀번호 다시 입력"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-[#26533D] hover:bg-[#1E4331] disabled:bg-[#8EA093] text-white text-xl font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>처리 중...</span>
            ) : mode === 'login' ? (
              <>
                <span>로그인하기</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>가입하고 계속하기</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Quick Demo Login Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickLoginTest}
              className="w-full py-2.5 px-3 bg-[#EAE3D2] hover:bg-[#DFD6C2] text-[#334737] rounded-xl text-sm font-bold transition-colors cursor-pointer border border-[#D2C5AB]"
            >
              ⚡ '정현정' 님 계정으로 1초 빠른 로그인
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
