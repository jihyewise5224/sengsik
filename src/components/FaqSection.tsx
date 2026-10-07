import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: '맛은 어떤가요? 풀맛이 강하지 않나요?',
      answer: '50가지 원료 중 고소한 발아현미, 검은콩, 흑미, 율무 등 곡물 비중이 적절하게 배합되어 있어 채소의 거부감 없이 고소하고 담백한 미숫가루 풍미를 느끼실 수 있습니다. 인위적인 설탕 단맛이 없어 질리지 않고 깔끔합니다.'
    },
    {
      question: '찬물이나 찬 우유에도 잘 녹나요?',
      answer: '네, 동결건조 후 미세 입자로 균일하게 분쇄 가공하여 냉장고에서 바로 꺼낸 찬물이나 찬 우유에도 쉐이커 보틀로 5~10초 가볍게 흔들어 주시면 부드럽게 잘 풀립니다. (액체를 먼저 붓고 가루를 넣어 흔드시면 더욱 잘 섞입니다.)'
    },
    {
      question: '보관 방법과 유통기한은 어떻게 되나요?',
      answer: '개별 알루미늄 증착 스틱 포장으로 빛과 수분을 완벽 차단하여 직사광선을 피해 서늘하고 건조한 실온(1~35℃)에 보관하시면 됩니다. 유통기한은 제조일로부터 18개월이며, 항상 최근 제조된 신선한 상품으로 출고합니다.'
    },
    {
      question: '하루에 몇 번 섭취하는 것이 좋나요?',
      answer: '일반적인 식사 대용으로 바쁜 아침 또는 저녁 식사 대용으로 하루 1회~2회 섭취하시는 것을 추천드립니다. 포만감이 풍부하여 가벼우면서도 든든한 일상을 유지하실 수 있습니다.'
    },
    {
      question: '아이들이나 어르신도 먹을 수 있는 일반 식품인가요?',
      answer: '네! 합성 첨가물, 합성 감미료, 방부제 없이 100% 국내산 자연 곡물과 채소로만 정성껏 만든 순수 곡물가공식품입니다. 온 가족이 안심하고 섭취하실 수 있습니다. (단, 특정 원료에 대한 알레르기가 있으신 분은 원재료명을 사전에 확인해 주세요.)'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-block text-base font-bold text-[#27533B] bg-[#E3EDE5] px-4 py-1.5 rounded-full border border-[#C5DDCB]">
            궁금증 해결
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E22] tracking-tight">
            자주 묻는 질문
          </h2>
          <p className="text-base sm:text-lg text-[#556958]">
            하루생식에 대해 고객님들께서 가장 많이 문의해주신 내용입니다.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DAC3] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F0] transition-colors"
                >
                  <span className="text-lg sm:text-xl font-bold text-[#1C2E22] flex items-center gap-3">
                    <span className="text-[#2E5A44] font-black text-xl">Q.</span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F4EFE6] text-[#2E5A44] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#2E5A44] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-base sm:text-lg text-[#4E6152] leading-relaxed border-t border-[#F2ECE0] bg-[#FAF8F3]">
                    <div className="flex items-start gap-3">
                      <span className="text-[#3B6E52] font-black text-xl shrink-0 mt-0.5">A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
