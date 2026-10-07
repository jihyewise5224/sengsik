import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
  onLookupClick?: () => void;
}

export function Footer({ onAdminClick, onLookupClick }: FooterProps) {
  return (
    <footer className="bg-[#EDE5D5] text-[#445648] py-12 sm:py-16 border-t border-[#DFD3BB] pb-24 md:pb-16 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-2xl font-black text-[#1C2E22] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2E5A44]"></span>
              <span>하루생식</span>
            </div>
            <p className="text-base text-[#566858] leading-relaxed max-w-md">
              자연이 선물한 국내산 50가지 곡물과 채소를 동결건조하여 온전히 담아냅니다. 
              바쁜 현대인의 일상에 가장 정직하고 간편한 식사 한 끼를 전합니다.
            </p>
            <p className="text-xs text-[#708072] pt-1">
              식품 유형: 곡류가공품(일반식품) · 유통기한: 제조일로부터 18개월
            </p>

            <div className="flex items-center gap-3 pt-3 text-xs sm:text-sm">
              {onLookupClick && (
                <button
                  type="button"
                  onClick={onLookupClick}
                  className="font-bold text-[#2E5A44] hover:underline cursor-pointer"
                >
                  내 주문 및 배송조회
                </button>
              )}
              <span className="text-[#B5A791]">·</span>
              {onAdminClick && (
                <button
                  type="button"
                  onClick={onAdminClick}
                  className="font-bold text-[#2E5A44] hover:underline cursor-pointer"
                >
                  사장님 주문 관리자 모드
                </button>
              )}
            </div>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-6 space-y-3 bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#DFD4BF]">
            <div className="text-base font-bold text-[#1C2E22]">고객만족센터 및 전화 주문 문의</div>
            <div className="text-2xl sm:text-3xl font-black text-[#26533D]">
              1588-5028
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-[#5B6D5E]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2E5A44] shrink-0" />
                <span>운영시간: 평일 09:30 ~ 18:00 (점심시간 12:30 ~ 13:30 / 주말·공휴일 휴무)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2E5A44] shrink-0" />
                <span>이메일 문의: cs@harusaengsik.co.kr</span>
              </div>
            </div>
          </div>

        </div>

        {/* Business details & compliance note */}
        <div className="pt-6 border-t border-[#DFD4BF] text-xs text-[#738274] space-y-2">
          <p>
            (주)하루생식농산 · 대표: 김자연 · 사업자등록번호: 214-88-09124 · 통신판매업신고: 제2026-서울강남-0194호
          </p>
          <p>
            소재지: 서울특별시 서초구 자연대로 50 · 반품/교환지: 충북 제천시 바이오밸리 1로 88 하루생식 물류센터
          </p>
          <p className="text-[#5B6D5E] font-medium pt-1">
            * 안내: 본 제품은 질병의 예방 및 치료를 위한 의약품이나 건강기능식품이 아니며, 자연 원료를 가공한 일반 곡류가공식품입니다.
          </p>
          <p className="pt-2">
            © 2026 하루생식 Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
