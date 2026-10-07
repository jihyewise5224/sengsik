interface MobileBottomBarProps {
  onOrderClick: () => void;
}

export function MobileBottomBar({ onOrderClick }: MobileBottomBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E5DAC3] px-4 py-2.5 shadow-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="leading-tight">
          <div className="text-xs text-[#5D6F60] font-medium">1박스 30포 (보틀 증정)</div>
          <div className="text-lg font-black text-[#26533D] tabular-nums">
            45,000원 <span className="text-xs font-bold text-[#6D7F70]">무료배송</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOrderClick}
          className="px-6 py-3 bg-[#26533D] hover:bg-[#1E4331] active:scale-[0.98] text-white text-lg font-black rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
