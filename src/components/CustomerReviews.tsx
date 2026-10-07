import { Star, ThumbsUp } from 'lucide-react';

export function CustomerReviews() {
  const reviews = [
    {
      author: '김*은 님 (직장인, 30대)',
      product: '1박스 구매',
      rating: 5,
      title: '아침 출근 전 1분이면 든든해요',
      content: '아침마다 밥 차려 먹기는 부담스럽고 굶으면 11시부터 허기졌는데, 우유 200ml에 한 포 타서 흔들어 마시니 정말 간편합니다. 인공적인 단맛 없이 미숫가루보다 훨씬 고소하고 담백해요.',
      date: '2026.03.28'
    },
    {
      author: '박*훈 님 (자영업, 40대)',
      product: '2박스 세트 구매',
      rating: 5,
      title: '속이 더부룩하지 않고 편안합니다',
      content: '가게 오픈 준비로 끼니 때를 자주 놓쳐 불규칙하게 때우곤 했는데, 보틀에 물만 부어서 마시면 되니 정말 수월합니다. 자극적인 조미료 맛이 아니라 자연 원재료 맛이라 질리지 않고 잘 맞습니다.',
      date: '2026.03.22'
    },
    {
      author: '이*정 님 (주부, 50대)',
      product: '3박스 세트 구매',
      rating: 5,
      title: '국내산 재료 50가지라 믿고 마십니다',
      content: '남편과 아침마다 한 잔씩 마시고 있어요. 50가지 국산 곡물과 채소가 들어있다고 해서 선택했는데 가루 입자가 고와서 찬물에도 뭉치지 않고 쑥쑥 잘 녹습니다. 전용 쉐이커 보틀도 실용적이에요.',
      date: '2026.03.15'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7EE] border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-block text-base font-bold text-[#27533B] bg-[#E3EDE5] px-4 py-1.5 rounded-full border border-[#C5DDCB]">
            솔직한 고객 경험
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1C2E22] tracking-tight">
            매일 아침을 함께하는 분들의 후기
          </h2>
          <p className="text-base sm:text-lg text-[#556958]">
            간편한 섭취와 담백하고 고소한 곡물 맛에 만족해주신 고객님들의 목소리입니다.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3DAC3] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Stars & verified */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#D9822B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#667769] bg-[#F2EDE2] px-2 py-0.5 rounded">
                    구매 고객 확인
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#1B3023] mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-base text-[#4F6253] leading-relaxed mb-6">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E9DA] flex items-center justify-between text-xs sm:text-sm text-[#738274]">
                <span className="font-bold text-[#2A4835]">{rev.author}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
