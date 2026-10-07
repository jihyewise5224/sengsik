import { User } from '../types';
import { UserCheck, LogIn, LogOut } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  onOrderClick: () => void;
  onAdminClick: () => void;
  onLookupClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Header({
  currentUser,
  onOrderClick,
  onAdminClick,
  onLookupClick,
  onLoginClick,
  onLogout
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F412F] flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#3B6E52] inline-block"></span>
          <span>하루생식</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-7 text-base sm:text-lg font-medium text-[#4A5D4E]">
          <a href="#ingredients" className="hover:text-[#1F412F] transition-colors py-1">50가지 재료</a>
          <a href="#target" className="hover:text-[#1F412F] transition-colors py-1">추천 대상</a>
          <a href="#how-to" className="hover:text-[#1F412F] transition-colors py-1">드시는 법</a>
          <a href="#product" className="hover:text-[#1F412F] transition-colors py-1">상품 안내</a>
          <button 
            type="button" 
            onClick={onLookupClick}
            className="hover:text-[#1F412F] transition-colors py-1 cursor-pointer"
          >
            주문조회
          </button>
        </nav>

        {/* Zone 3: Primary actions & User greeting */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* User Status / Greeting */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#E7F2EB] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#C6DDD0]">
              <span className="w-2 h-2 rounded-full bg-[#2E5A44] animate-pulse"></span>
              <span className="text-sm sm:text-base font-extrabold text-[#1F412F]">
                <strong>{currentUser.name}</strong> 님 환영합니다
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="ml-1 text-xs text-[#596F60] hover:text-[#1F412F] underline cursor-pointer"
                title="로그아웃"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#3B5442] bg-[#FAF5EC] hover:bg-[#F2ECE0] rounded-xl transition-colors cursor-pointer border border-[#DCD0BA] flex items-center gap-1.5 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 text-[#2E5A44]" />
              <span>로그인/가입</span>
            </button>
          )}

          <button
            type="button"
            onClick={onAdminClick}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold text-[#2A5C41] bg-[#E8F2EC] hover:bg-[#D8ECE0] rounded-xl transition-colors cursor-pointer border border-[#BFDEC9] whitespace-nowrap flex items-center gap-1.5"
            title="판매자 실시간 주문 관리"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block"></span>
            <span>주문관리</span>
          </button>

          <button
            type="button"
            onClick={onOrderClick}
            className="px-4 sm:px-6 py-2 sm:py-2.5 text-base sm:text-lg font-black text-white bg-[#2E5A44] hover:bg-[#234534] active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            주문하기
          </button>
        </div>
      </div>
    </header>
  );
}
