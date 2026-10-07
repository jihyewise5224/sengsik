import { useState } from 'react';
import { Leaf, Shield, Sparkles, Snowflake, Check } from 'lucide-react';

const ingredientCategories = [
  {
    id: 'grains',
    title: '곡물류 (16종)',
    desc: '속을 든든하게 채워주는 100% 국내산 통곡물',
    items: [
      '발아현미', '찰현미', '백미', '흑미', '율무', '수수', 
      '기장', '차조', '통밀', '귀리', '보리', '찰보리', 
      '서리태(검은콩)', '백태', '팥', '메밀'
    ]
  },
  {
    id: 'veggies',
    title: '채소·잎채소류 (16종)',
    desc: '자연의 싱그러운 엽록소와 식이섬유를 담은 녹황색 채소',
    items: [
      '케일', '신선초', '브로콜리', '시금치', '양배추', '적양배추', 
      '당근', '단호박', '청경채', '샐러리', '파슬리', '쑥', 
      '미나리', '취나물', '무청', '뽕잎'
    ]
  },
  {
    id: 'roots_mushrooms',
    title: '뿌리·버섯류 (10종)',
    desc: '대지의 깊은 향과 담백함을 전하는 뿌리채소와 버섯',
    items: [
      '우엉', '연근', '마', '무', '자색고구마', 
      '표고버섯', '느타리버섯', '팽이버섯', '새송이버섯', '차가버섯'
    ]
  },
  {
    id: 'seaweeds_seeds',
    title: '해조·씨앗류 (8종)',
    desc: '바다의 미네랄과 고소함을 더해주는 해조류 및 통씨앗',
    items: [
      '다시마', '미역', '톳', '김', 
      '검은깨(흑임자)', '참깨', '해바라기씨', '호박씨'
    ]
  }
];

export function IngredientsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'grains' | 'veggies' | 'roots_mushrooms' | 'seaweeds_seeds'>('all');

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#2A5C41] bg-[#E8F2EC] px-4 py-1.5 rounded-full border border-[#CFE3D5]">
            <Leaf className="w-4 h-4 text-[#2E5A44]" />
            <span>원산지 100% 국산 농산물</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C2E22] tracking-tight text-balance">
            국내산 50가지 곡물과 채소, <br />
            자연 그대로 한 포에 담았습니다
          </h2>

          <p className="text-lg sm:text-xl text-[#445848] font-normal leading-relaxed">
            화학 첨가물이나 보존료 없이, 우리 땅에서 자란 건강한 50가지 곡물·채소·버섯·해조류를 
            엄선하여 깨끗하게 씻고 동결건조 분말로 정성껏 가공했습니다.
          </p>
        </div>

        {/* Feature Grid with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-16">
          
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border-2 border-[#E5DBCA] shadow-md bg-white">
            <img
              src="/src/assets/images/saengsik_50_grains_1791342962087.jpg"
              alt="국내산 50가지 자연 곡물과 채소 원료"
              className="w-full h-auto aspect-4/3 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 sm:p-6 bg-[#FAF7F0] border-t border-[#E5DBCA]">
              <div className="text-sm font-semibold text-[#6B7E6F] mb-1">
                원재료 신뢰 약속
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#1C2E22]">
                합성감미료 · 인공착향료 · 방부제 무첨가
              </div>
              <p className="text-base text-[#526555] mt-1">
                단맛을 내기 위한 합성 설탕 시럽 대신, 원물 고유의 담백하고 은은한 고소함을 살렸습니다.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            
            {/* Process 1 */}
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E5DBCA]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                  <Snowflake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C2E22] mb-1">
                    동결건조(Freeze-Drying) 공법
                  </h3>
                  <p className="text-base sm:text-lg text-[#4E6152] leading-relaxed">
                    열을 가하지 않고 영하 40℃ 이하에서 급속 동결 후 수분만 건조시켜, 열에 약한 곡물과 채소 고유의 엽록소, 맛, 향을 손실 없이 보존합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Process 2 */}
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E5DBCA]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C2E22] mb-1">
                    100% 국내산 원료 원산지 보증
                  </h3>
                  <p className="text-base sm:text-lg text-[#4E6152] leading-relaxed">
                    수입산 혼합 분말을 섞지 않고 전라·충청·강원 등 국내 청정 산지에서 수확된 농산물만을 정직하게 수급하여 제조합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Process 3 */}
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E5DBCA]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C2E22] mb-1">
                    간편한 개별 스틱 1포(40g) 포장
                  </h3>
                  <p className="text-base sm:text-lg text-[#4E6152] leading-relaxed">
                    대용량 통 형태의 번거로운 스푼 계량 없이, 1포씩 위생적으로 휴대하고 언제 어디서든 바로 뜯어 음용할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 50 Ingredients Full List Accordion/Tabs */}
        <div className="bg-[#F6F1E6] rounded-3xl p-6 sm:p-10 border border-[#E0D5BE]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B3023]">
                50가지 전성분 상세 목록
              </h3>
              <p className="text-base sm:text-lg text-[#556958]">
                궁금한 원료를 확인해보세요. 모든 원료는 안전한 국내산 농산물입니다.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-base font-bold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#2E5A44] text-white shadow-xs'
                    : 'bg-[#EDE4D2] text-[#4E6152] hover:bg-[#E2D6C0]'
                }`}
              >
                전체 (50종)
              </button>
              {ingredientCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-base font-bold transition-colors cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-[#2E5A44] text-white shadow-xs'
                      : 'bg-[#EDE4D2] text-[#4E6152] hover:bg-[#E2D6C0]'
                  }`}
                >
                  {cat.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient Pills/Boxes */}
          <div className="space-y-6">
            {ingredientCategories
              .filter((cat) => activeTab === 'all' || activeTab === cat.id)
              .map((cat) => (
                <div key={cat.id} className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-[#DFD3BB]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 pb-3 border-b border-[#EFE8DA]">
                    <div className="font-extrabold text-[#204430] text-xl">
                      {cat.title}
                    </div>
                    <div className="text-sm sm:text-base text-[#6B7E6F]">
                      {cat.desc}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F0] border border-[#E7DECD] px-3 py-2.5 rounded-xl text-center font-medium text-[#2C4132] text-base hover:bg-[#F0EAE0] transition-colors"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>
    </section>
  );
}
