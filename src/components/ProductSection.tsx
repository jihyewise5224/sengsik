import { useState } from 'react';
import { Check, Truck, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { ProductBundle } from '../types';

interface ProductSectionProps {
  onOrderWithBundle: (bundle: ProductBundle) => void;
}

export const defaultBundles: ProductBundle[] = [
  {
    id: 'bundle-1',
    name: '1박스 (30포 / 1개월분)',
    subtitle: '처음 시작하시는 분을 위한 기본 구성',
    count: 1,
    originalPrice: 58000,
    price: 45000,
    badge: '기본 22% 할인'
  },
  {
    id: 'bundle-2',
    name: '2박스 (60포 / 2개월분)',
    subtitle: '부부 또는 가족과 함께 드시는 실속 구성',
    count: 2,
    originalPrice: 116000,
    price: 85000,
    badge: '추가할인 5,000원',
    isPopular: true
  },
  {
    id: 'bundle-3',
    name: '3박스 (90포 / 3개월분)',
    subtitle: '꾸준히 매일 아침 드시는 대용량 특가',
    count: 3,
    originalPrice: 174000,
    price: 120000,
    badge: '최대 15,000원 추가할인'
  }
];

export function ProductSection({ onOrderWithBundle }: ProductSectionProps) {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-1');

  const selectedBundle = defaultBundles.find((b) => b.id === selectedBundleId) || defaultBundles[0];

  const handleOrder = () => {
    onOrderWithBundle(selectedBundle);
  };

  return (
    <section id="product" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-block text-base sm:text-lg font-bold text-[#27533B] bg-[#E3EDE5] px-4 py-1.5 rounded-full border border-[#C5DDCB]">
            정직한 단 하나의 상품
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C2E22] tracking-tight text-balance">
            자연을 담은 하루생식 50선
          </h2>

          <p className="text-lg sm:text-xl text-[#4A5D4E] leading-relaxed">
            국내산 50가지 원료를 듬뿍 담은 40g 든든한 1포. 합리적인 가격과 무료배송 혜택으로 만나보세요.
          </p>
        </div>

        {/* Product Purchase Box */}
        <div className="bg-white rounded-3xl border-2 border-[#E3DAC3] shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-10">
            
            {/* Product Image Area */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#E5DAC3] bg-[#FAF7F0]">
                <img
                  src="/src/assets/images/saengsik_product_box_1791342974641.jpg"
                  alt="하루생식 프리미엄 50선 상품 패키지"
                  className="w-full h-auto aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Free Gift Card */}
              <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E7DECD] flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2E5A44] text-white flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-extrabold text-[#1F412F] text-base sm:text-lg">
                    전 구매 고객 전용 보틀 무료 증정
                  </div>
                  <div className="text-sm text-[#5B6D5E]">
                    BPA FREE 친환경 에코 쉐이커 보틀 (500ml) 함께 배송
                  </div>
                </div>
              </div>

              {/* Delivery & Trust Points */}
              <div className="space-y-2 text-sm sm:text-base text-[#465A49]">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#2E5A44] shrink-0" />
                  <span><strong>전 지역 무료배송</strong> (우체국/CJ대한통운 안전배송)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#2E5A44] shrink-0" />
                  <span>평일 오후 2시 이전 주문 시 <strong>당일 즉시 발송</strong></span>
                </div>
              </div>
            </div>

            {/* Product Information & Bundle Choice */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="text-sm sm:text-base font-extrabold text-[#2F6146] mb-1">
                  100% 국내산 50가지 곡물·채소 동결건조 분말
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-black text-[#1C2E22] tracking-tight mb-2">
                  하루생식 50선 프리미엄 1박스 (30포)
                </h3>

                <p className="text-base sm:text-lg text-[#556958] leading-relaxed mb-6">
                  1회 분량 40g 개별 스틱으로 포장되어 매일 아침 가볍고 든든하게 식사를 대신할 수 있습니다.
                </p>

                {/* Price Display */}
                <div className="bg-[#F8F4EA] p-5 sm:p-6 rounded-2xl border border-[#E3DAC3] mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-base sm:text-lg text-[#6B7D6E] line-through">
                      정상가 {selectedBundle.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-xs sm:text-sm font-bold bg-[#E8F2EC] text-[#224E36] px-3 py-1 rounded-md">
                      {selectedBundle.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-lg sm:text-xl font-bold text-[#35483A]">
                      판매가
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-5xl font-black text-[#26533D] tabular-nums">
                        {selectedBundle.price.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold text-[#1C2E22]">원</span>
                    </div>
                  </div>

                  <div className="text-right text-sm text-[#5B6D5E] mt-1">
                    (1포당 약 {Math.round(selectedBundle.price / (selectedBundle.count * 30)).toLocaleString()}원 / 무료배송)
                  </div>
                </div>

                {/* Bundle Options Selector */}
                <div className="space-y-3 mb-6">
                  <label className="block text-base sm:text-lg font-bold text-[#233527]">
                    수량 선택 (박스 번들 할인 혜택)
                  </label>

                  {defaultBundles.map((bundle) => {
                    const isSelected = bundle.id === selectedBundleId;
                    return (
                      <button
                        key={bundle.id}
                        type="button"
                        onClick={() => setSelectedBundleId(bundle.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#2E5A44] bg-[#F1F8F4] shadow-xs'
                            : 'border-[#E5DAC3] bg-white hover:bg-[#FAF7F0]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#2E5A44] bg-[#2E5A44] text-white'
                                : 'border-[#C2B7A0]'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>

                          <div>
                            <div className="font-extrabold text-base sm:text-lg text-[#1C2E22] flex items-center gap-2">
                              <span>{bundle.name}</span>
                              {bundle.isPopular && (
                                <span className="bg-[#EAE0CB] text-[#4A3C23] text-xs font-bold px-2 py-0.5 rounded">
                                  인기 추천
                                </span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-[#5B6D5E]">
                              {bundle.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-extrabold text-lg sm:text-xl text-[#26533D] tabular-nums">
                          {bundle.price.toLocaleString()}원
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Big Prominent Order Button */}
              <div>
                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full py-5 sm:py-6 bg-[#26533D] hover:bg-[#1C412F] active:scale-[0.99] text-white text-2xl sm:text-3xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3"
                >
                  <span>주문하기</span>
                  <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
                
                <p className="text-center text-sm sm:text-base text-[#607163] mt-3">
                  간편주문서 작성으로 회원가입 없이 1분 만에 주문 가능합니다.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
