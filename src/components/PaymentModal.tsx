import { useState } from 'react';
import { X, CreditCard, ShieldAlert, Check, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { ProductBundle, PlacedOrder } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    bundle: ProductBundle;
    buyerName: string;
    phone: string;
    address: string;
    detailAddress: string;
    requestNote: string;
  } | null;
  onPaymentSuccess: (order: PlacedOrder) => void;
}

export function PaymentModal({ isOpen, onClose, orderInfo, onPaymentSuccess }: PaymentModalProps) {
  const [payMethod, setPayMethod] = useState<'card' | 'naver' | 'kakao' | 'toss' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('777');
  const [cardPassword2Digits, setCardPassword2Digits] = useState('12');
  const [installment, setInstallment] = useState('일시불');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !orderInfo) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg(null);

    let methodLabel = '신용/체크카드 (연습결제)';
    if (payMethod === 'naver') methodLabel = '네이버페이 (연습결제)';
    if (payMethod === 'kakao') methodLabel = '카카오페이 (연습결제)';
    if (payMethod === 'toss') methodLabel = '토스페이 (연습결제)';
    if (payMethod === 'bank') methodLabel = '무통장 입금 (가상계좌)';

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundle: orderInfo.bundle,
          buyerName: orderInfo.buyerName,
          phone: orderInfo.phone,
          address: orderInfo.address,
          detailAddress: orderInfo.detailAddress,
          requestNote: orderInfo.requestNote,
          paymentMethod: methodLabel,
          totalPrice: orderInfo.bundle.price
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || '결제 처리에 실패했습니다.');
      }

      const placedOrder: PlacedOrder = await res.json();

      // Realistic 0.6s approval delay for simulation
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess(placedOrder);
      }, 600);
    } catch (err: any) {
      console.error(err);
      setIsProcessing(false);
      setErrorMsg(err.message || '결제 승인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F0] border-b border-[#E8DFC8] flex items-center justify-between shrink-0">
          <div>
            <div className="inline-block text-xs font-bold text-[#2A5C41] bg-[#E5EFE7] px-2.5 py-0.5 rounded-md mb-0.5">
              안전 결제 테스트 창구
            </div>
            <h3 className="text-2xl font-black text-[#1C2E22] tracking-tight">
              간편 결제하기
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Prominent Practice/Mock Payment Banner */}
        <div className="bg-amber-50 border-b-2 border-amber-200 px-5 sm:px-6 py-4 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-amber-900 leading-tight">
              ⚠️ 실제로 결제되지 않는 연습용 입니다
            </div>
            <div className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
              실제 통장이나 카드에서 돈이 절대 빠져나가지 않으니 안심하고 편하게 결제해 보세요!
            </div>
          </div>
        </div>

        {/* Body Content */}
        <form onSubmit={handlePay} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Order Summary Summary Pill */}
          <div className="bg-[#F6F1E6] p-4 rounded-2xl border border-[#E3DAC3] space-y-2">
            <div className="flex justify-between items-center text-sm sm:text-base text-[#465A49]">
              <span>주문 상품</span>
              <span className="font-bold text-[#1C2E22]">{orderInfo.bundle.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base text-[#465A49]">
              <span>받는 분</span>
              <span className="font-bold text-[#1C2E22]">{orderInfo.buyerName} ({orderInfo.phone})</span>
            </div>
            <div className="pt-2 border-t border-[#E5DAC3] flex justify-between items-baseline">
              <span className="font-bold text-base text-[#1C2E22]">총 결제 금액</span>
              <div className="text-2xl sm:text-3xl font-black text-[#26533D] tabular-nums">
                {orderInfo.bundle.price.toLocaleString()}원 <span className="text-xs font-normal text-[#5B6E5F]">(무료배송)</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector Grid */}
          <div className="space-y-3">
            <label className="block text-base sm:text-lg font-bold text-[#1C2E22]">
              결제 수단 선택
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* 1. 신용/체크카드 */}
              <button
                type="button"
                onClick={() => setPayMethod('card')}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  payMethod === 'card'
                    ? 'border-[#2E5A44] bg-[#F1F8F4] text-[#1C2E22] shadow-xs ring-1 ring-[#2E5A44]'
                    : 'border-[#E6DDD0] bg-white text-[#526555] hover:bg-[#FAF7F0]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#2E5A44]" />
                <span className="text-xs sm:text-sm font-extrabold">신용/체크카드</span>
              </button>

              {/* 2. 네이버페이 */}
              <button
                type="button"
                onClick={() => setPayMethod('naver')}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  payMethod === 'naver'
                    ? 'border-[#03C75A] bg-[#EBF9F1] text-[#03C75A] shadow-xs ring-1 ring-[#03C75A]'
                    : 'border-[#E6DDD0] bg-white text-[#526555] hover:bg-[#FAF7F0]'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-[#03C75A] text-white flex items-center justify-center text-xs font-black">
                  N
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#1B3623]">네이버페이</span>
              </button>

              {/* 3. 카카오페이 */}
              <button
                type="button"
                onClick={() => setPayMethod('kakao')}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  payMethod === 'kakao'
                    ? 'border-[#FEE500] bg-[#FFFDE6] text-[#3C1E1E] shadow-xs ring-1 ring-[#FEE500]'
                    : 'border-[#E6DDD0] bg-white text-[#526555] hover:bg-[#FAF7F0]'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center text-xs font-black">
                  K
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#3C1E1E]">카카오페이</span>
              </button>

              {/* 4. 토스페이 */}
              <button
                type="button"
                onClick={() => setPayMethod('toss')}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  payMethod === 'toss'
                    ? 'border-[#0064FF] bg-[#EBF3FF] text-[#0064FF] shadow-xs ring-1 ring-[#0064FF]'
                    : 'border-[#E6DDD0] bg-white text-[#526555] hover:bg-[#FAF7F0]'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-[#0064FF] text-white flex items-center justify-center text-xs font-black">
                  T
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#0047BA]">토스페이</span>
              </button>
            </div>
          </div>

          {/* Conditional Detail Form based on selected method */}

          {/* 1. Credit Card Mode */}
          {payMethod === 'card' && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#E5DAC3] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E9DA]">
                <span className="font-extrabold text-[#1C2E22] text-sm sm:text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#2E5A44]" />
                  <span>카드 정보 입력 (연습용 자동 입력 완료)</span>
                </span>
                <span className="text-xs text-[#2E5A44] font-bold bg-[#E8F2EC] px-2 py-0.5 rounded">
                  테스트 카드
                </span>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#405445] mb-1">
                  카드번호 (미리 입력된 번호 사용)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1111-2222-3333-4444"
                  className="w-full px-4 py-3 text-base sm:text-lg font-mono font-bold tracking-wider rounded-xl border border-[#D5C9B3] bg-[#FAF8F3] text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#405445] mb-1">
                    유효기간
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2.5 text-center font-mono font-bold rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#405445] mb-1">
                    CVC 3자리
                  </label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="777"
                    maxLength={3}
                    className="w-full px-3 py-2.5 text-center font-mono font-bold rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#405445] mb-1">
                    할부 구분
                  </label>
                  <select
                    value={installment}
                    onChange={(e) => setInstallment(e.target.value)}
                    className="w-full px-2 py-2.5 text-center font-bold text-xs sm:text-sm rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22]"
                  >
                    <option value="일시불">일시불</option>
                    <option value="2개월">2개월 무이자</option>
                    <option value="3개월">3개월 무이자</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 2. Naver Pay Mode */}
          {payMethod === 'naver' && (
            <div className="bg-[#F2FAF5] p-5 rounded-2xl border-2 border-[#A8E2BF] space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#03C75A] text-white font-extrabold text-xs">
                <span>네이버페이 포인트 / 간편결제</span>
              </div>
              <h4 className="text-lg font-black text-[#134D28]">
                네이버페이 1초 연습 결제
              </h4>
              <p className="text-xs sm:text-sm text-[#386D49] leading-relaxed">
                네이버 계정 연동 상태로 인식되었습니다. 아래 버튼을 누르면 별도 인증 창 없이 즉시 승인 처리됩니다.
              </p>
            </div>
          )}

          {/* 3. Kakao Pay Mode */}
          {payMethod === 'kakao' && (
            <div className="bg-[#FFFEEB] p-5 rounded-2xl border-2 border-[#F9E24F] space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE500] text-[#3C1E1E] font-black text-xs">
                <span>카카오페이 머니 / 카드 간편결제</span>
              </div>
              <h4 className="text-lg font-black text-[#3C1E1E]">
                카카오페이 1초 연습 결제
              </h4>
              <p className="text-xs sm:text-sm text-[#5C4528] leading-relaxed">
                카카오페이 머니 잔액에서 차감되는 시뮬레이션입니다. 실제 금전 결제는 발생하지 않습니다.
              </p>
            </div>
          )}

          {/* 4. Toss Pay Mode */}
          {payMethod === 'toss' && (
            <div className="bg-[#F0F6FF] p-5 rounded-2xl border-2 border-[#A3C7FF] space-y-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0064FF] text-white font-black text-xs">
                <span>토스페이 1초 간편결제</span>
              </div>
              <h4 className="text-lg font-black text-[#0B3982]">
                토스 1초 연습 결제
              </h4>
              <p className="text-xs sm:text-sm text-[#275399] leading-relaxed">
                토스 앱 승인 가상 시뮬레이션입니다. 아래 결제하기 버튼을 누르면 즉시 완료됩니다.
              </p>
            </div>
          )}

          {/* Big Prominent Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-5 sm:py-6 bg-[#26533D] hover:bg-[#1C412F] disabled:bg-[#8CA293] text-white text-2xl sm:text-3xl font-black rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <span>연습 결제 승인 처리 중...</span>
            ) : (
              <>
                <span>{orderInfo.bundle.price.toLocaleString()}원 결제하기</span>
                <ArrowRight className="w-7 h-7" />
              </>
            )}
          </button>

          <div className="text-center text-xs text-[#738274] flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#2E5A44]" />
            <span>256-bit SSL 모의 보안 결제망 연결됨 · 실제 요금 청구 없음</span>
          </div>

        </form>
      </div>
    </div>
  );
}
