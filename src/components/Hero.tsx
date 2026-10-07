import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FDFBF7] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Honest kicker */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EFE7] text-[#255239] text-base sm:text-lg font-semibold border border-[#CCE2D1]">
              <Sparkles className="w-4 h-4 text-[#2E5A44]" />
              <span>100% 국내산 자연 원료 50종 그대로</span>
            </div>

            {/* Core headline requested: "하루한잔, 간편한 한끼" */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C2E22] tracking-tight leading-[1.25] text-balance">
                하루한잔, <br className="sm:hidden" />
                <span className="text-[#2B6043] underline decoration-[#98C2A8] decoration-4 underline-offset-8">간편한 한끼</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-[#3A4E3E] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                바쁜 일상 속에서 물이나 우유에 타서 가볍게 흔들면 끝! <br className="hidden sm:inline" />
                정직한 50가지 곡물과 채소로 완성한 든든하고 속 편한 자연식입니다.
              </p>
            </div>

            {/* Core highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-1 text-left">
              <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-[#E3DAC3] shadow-xs">
                <div className="flex items-center gap-2 font-bold text-[#1F412F] text-lg mb-1">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0" />
                  <span>50가지 원료</span>
                </div>
                <p className="text-sm sm:text-base text-[#57685A]">국내산 곡물·채소·버섯·해조류를 골고루</p>
              </div>

              <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-[#E3DAC3] shadow-xs">
                <div className="flex items-center gap-2 font-bold text-[#1F412F] text-lg mb-1">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0" />
                  <span>동결건조 공법</span>
                </div>
                <p className="text-sm sm:text-base text-[#57685A]">열을 가하지 않아 자연 본연의 맛 유지</p>
              </div>

              <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-[#E3DAC3] shadow-xs">
                <div className="flex items-center gap-2 font-bold text-[#1F412F] text-lg mb-1">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0" />
                  <span>1분 완성 간편함</span>
                </div>
                <p className="text-sm sm:text-base text-[#57685A]">보틀에 넣고 10초 흔들면 바로 마시는 한 끼</p>
              </div>
            </div>

            {/* Large Order Button & Guarantee notice */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 bg-[#26533D] hover:bg-[#1E4331] text-white text-2xl sm:text-3xl font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3"
              >
                <span>주문하기</span>
                <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              
              <div className="text-center sm:text-left text-sm sm:text-base text-[#5E7262] flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-5 h-5 text-[#37694D] shrink-0" />
                <span>정가 58,000원 → <strong>특가 45,000원</strong> (무료배송)</span>
              </div>
            </div>

            {/* Honest disclaimer banner */}
            <div className="text-xs sm:text-sm text-[#738274] bg-[#F2EDE2] px-4 py-2.5 rounded-xl border border-[#E1D7C3] inline-block text-left">
              * 본 제품은 의약품이나 건강기능식품이 아닌 <strong>자연 원료를 가공한 일반 곡물가공식품(생식)</strong>입니다.
            </div>

          </div>

          {/* Visual Showcase Area */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative backplate */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#3A6B4E]/20 to-[#E4D5B7]/50 rounded-3xl blur-lg transform -rotate-1"></div>
              
              {/* Product Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white border-4 border-[#EAE2D1] shadow-xl">
                <img
                  src="/src/assets/images/saengsik_hero_drink_1791342949070.jpg"
                  alt="신선한 국내산 곡물과 채소로 만든 하루생식 한 잔"
                  className="w-full h-auto aspect-16/9 sm:aspect-4/3 object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Information Card on the Image */}
                <div className="p-5 sm:p-6 bg-[#FAF7F0] border-t border-[#EAE2D1]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold text-[#2A5C41] tracking-wide bg-[#E5EFE7] px-3 py-1 rounded-md">
                      자연 그대로의 식사 대용
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#4B5E4F]">
                      1박스 30포 (1개월분)
                    </span>
                  </div>
                  
                  <div className="text-xl sm:text-2xl font-black text-[#1E3023]">
                    하루생식 프리미엄 50선
                  </div>
                  
                  <p className="mt-1 text-base text-[#566858] leading-snug">
                    합성 첨가물·인공 착향료 0%. 곡물 본연의 담백하고 고소한 맛을 즐겨보세요.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
