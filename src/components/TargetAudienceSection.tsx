import { Sun, Utensils, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function TargetAudienceSection() {
  const audiences = [
    {
      number: '01',
      title: '아침 식사를 자주 거르는 분',
      sub: '출근·등교 전 바쁜 아침, 1분 만에 든든하게',
      desc: '잠 깰 시간도 부족한 아침, 밥을 차려 먹기는 부담스럽고 굶자니 속이 허전하셨나요? 물이나 우유에 흔들어 1분이면 간편하게 마실 수 있어 하루의 시작이 든든해집니다.',
      points: ['보틀에 타서 이동 중에도 음용 가능', '가볍게 마시지만 점심까지 든든한 포만감', '부담 없는 담백한 곡물 맛'],
      icon: Sun,
    },
    {
      number: '02',
      title: '끼니 챙기기 번거로운 분',
      sub: '조리와 뒤처리 없이 즐기는 정갈한 식사',
      desc: '혼자 밥 챙겨 먹기 귀찮을 때, 매번 요리하고 설거지하는 과정이 번거로우셨나요? 스틱 1포를 뜯어 흔들기만 하면 설거지 걱정 없이 영양 가득한 한 끼 식사가 해결됩니다.',
      points: ['개별 스틱 포장으로 계량 필요 없음', '간단한 쉐이커 헹굼만으로 뒤처리 끝', '사무실, 연구실, 서재 어디서나 간편'],
      icon: Utensils,
    },
    {
      number: '03',
      title: '속 편안한 자연식을 찾는 분',
      sub: '50가지 순수 곡물과 채소의 온화함',
      desc: '기름진 인스턴트나 자극적인 외식 배달 음식에 지쳐 속 편안한 자연의 식사를 원하시나요? 화학첨가물 없이 오직 국내산 곡물과 채소만을 동결건조해 속이 편안합니다.',
      points: ['합성감미료·착향료 0%의 자연 원물 맛', '자연 곡물 식이섬유 그대로 섭취', '자극 없이 속이 편안한 일상 식단'],
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="target" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-block text-base sm:text-lg font-bold text-[#27533B] bg-[#E3EDE5] px-4 py-1.5 rounded-full border border-[#C5DDCB]">
            맞춤형 식사 추천
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C2E22] tracking-tight text-balance">
            이런 분께 특히 좋아요
          </h2>

          <p className="text-lg sm:text-xl text-[#4B5E4F] leading-relaxed">
            복잡한 준비 없이 자연이 주는 건강한 재료를 가장 간편하게 즐기고 싶은 분들을 위해 만들었습니다.
          </p>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border-2 border-[#E5DAC3] shadow-xs hover:border-[#2E5A44] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card top badge & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#2E5A44]">
                      {item.number}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#E8F2EC] text-[#2E5A44] flex items-center justify-center">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B3022] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-base font-bold text-[#3B6E52] mb-4">
                    {item.sub}
                  </div>

                  <p className="text-base sm:text-lg text-[#556758] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Point checkmarks */}
                <div className="pt-4 border-t border-[#EDE4D2] space-y-2.5">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-base text-[#384C3D] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
