import { Droplets, Milk, Sparkles, Check, ArrowRight } from 'lucide-react';

export function HowToDrinkSection() {
  const steps = [
    {
      step: '1',
      title: '붓기',
      sub: '물 또는 우유 200ml 먼저 붓기',
      desc: '보틀이나 컵에 물, 우유, 또는 두유 약 200ml를 먼저 붓습니다.',
      tip: '★ 꿀팁: 가루보다 액체를 먼저 넣어야 바닥에 뭉침 없이 잘 섞입니다.'
    },
    {
      step: '2',
      title: '넣기',
      sub: '하루생식 1포(40g) 넣기',
      desc: '이지컷 스틱을 뜯어 보틀에 가루를 한 포 가볍게 털어 넣습니다.',
      tip: '개별 포장되어 있어 계량 스푼 없이 언제 어디서나 깔끔합니다.'
    },
    {
      step: '3',
      title: '흔들기',
      sub: '뚜껑 닫고 5~10초 흔들어 음용',
      desc: '뚜껑을 닫고 위아래로 가볍게 몇 번 흔들어주면 든든한 한 끼 완성!',
      tip: '동결건조 미세 분말로 찬물에도 부드럽게 잘 섞입니다.'
    }
  ];

  return (
    <section id="how-to" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-block text-base sm:text-lg font-bold text-[#27533B] bg-[#E3EDE5] px-4 py-1.5 rounded-full border border-[#C5DDCB]">
            간편한 음용법
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C2E22] tracking-tight text-balance">
            물이나 우유에 타서 드세요 <br className="sm:hidden" />
            <span className="text-[#2B6043]">(1 → 2 → 3 간편 완성)</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#4A5D4E] leading-relaxed">
            바쁜 아침에도 단 1분이면 끝납니다. 불을 켜거나 칼을 쓸 필요 없이 흔들기만 하세요.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E5DAC3] shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#2E5A44] text-white flex items-center justify-center text-3xl font-black">
                    {item.step}
                  </div>
                  <span className="text-sm sm:text-base font-extrabold text-[#748777] uppercase tracking-wider">
                    STEP {item.step}
                  </span>
                </div>

                <div className="text-3xl font-extrabold text-[#1B3022] mb-1">
                  {item.title}
                </div>

                <div className="text-lg font-bold text-[#3B6E52] mb-3">
                  {item.sub}
                </div>

                <p className="text-base sm:text-lg text-[#556758] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Tip */}
              <div className="p-3.5 bg-[#F6F2E8] rounded-xl text-sm sm:text-base text-[#465A49] font-medium border border-[#E9E0CD]">
                {item.tip}
              </div>

              {/* Arrow connector for desktop */}
              {idx < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2E5A44] text-white items-center justify-center shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Beverage Taste Guide */}
        <div className="bg-[#EFE8DA] rounded-3xl p-6 sm:p-10 border border-[#DED1B8]">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D3325] text-center mb-2">
            취향에 맞게 골라 타는 3가지 꿀맛 조합
          </h3>
          <p className="text-center text-base sm:text-lg text-[#5B6D5E] mb-8">
            어떤 음료와 함께해도 자연의 고소함이 부드럽게 어우러집니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFD3BB]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2E5A44] flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xl text-[#1E3326]">
                  물 200ml
                </div>
              </div>
              <div className="text-base font-bold text-[#3B6E52] mb-2">
                담백하고 산뜻한 본연의 맛
              </div>
              <p className="text-base text-[#576B5A]">
                자연 곡물과 채소 고유의 맑고 깔끔한 맛을 그대로 느끼고 싶을 때 추천합니다.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFD3BB]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0DC] text-[#916216] flex items-center justify-center">
                  <Milk className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xl text-[#1E3326]">
                  우유 200ml
                </div>
              </div>
              <div className="text-base font-bold text-[#3B6E52] mb-2">
                부드럽고 고소한 곡물 라떼
              </div>
              <p className="text-base text-[#576B5A]">
                우유의 풍미가 더해져 미숫가루나 라떼처럼 부드럽고 든든한 포만감을 줍니다.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DFD3BB]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBE8DE] text-[#554C34] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xl text-[#1E3326]">
                  두유 200ml
                </div>
              </div>
              <div className="text-base font-bold text-[#3B6E52] mb-2">
                더욱 깊고 진한 고소함
              </div>
              <p className="text-base text-[#576B5A]">
                달지 않은 플레인 두유와 함께 섞으면 진한 콩의 고소함으로 오후까지 든든합니다.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
