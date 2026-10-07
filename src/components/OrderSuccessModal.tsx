import { CheckCircle2, Package, Truck, Phone, X, ShieldCheck } from 'lucide-react';
import { PlacedOrder } from '../types';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl p-6 sm:p-8 my-auto text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#2E5A44] text-white mx-auto flex items-center justify-center mb-3 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-block text-xs sm:text-sm font-extrabold text-[#2A5C41] bg-[#E5EFE7] px-3 py-1 rounded-md mb-2">
          연습 결제 승인 완료
        </div>

        {/* Large 주문완료 headline */}
        <h3 className="text-3xl sm:text-4xl font-black text-[#1C2E22] mb-1">
          주문완료
        </h3>

        <p className="text-sm sm:text-base text-[#566858] leading-relaxed mb-5">
          실제로 돈이 빠져나가지 않는 <strong>연습용 주문 테스트</strong>가 성공적으로 접수되었습니다.
        </p>

        {/* Order Number Box requested: e.g. ORD-20261001-3843 */}
        <div className="bg-[#EFE8DA] p-4 rounded-2xl border border-[#DFD3BB] mb-5">
          <div className="text-xs sm:text-sm text-[#667769] font-bold">주문번호</div>
          <div className="text-2xl sm:text-3xl font-black text-[#26533D] font-mono tracking-wider tabular-nums mt-0.5">
            {order.orderNumber}
          </div>
        </div>

        {/* Receipt info */}
        <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#E3DAC3] text-left space-y-2.5 text-sm sm:text-base text-[#465A49] mb-5">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#667769]">상품 내역</span>
            <span className="font-bold text-[#1C2E22]">{order.bundle.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#667769]">받는 분</span>
            <span className="font-bold text-[#1C2E22]">{order.buyerName} ({order.phone})</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="font-semibold text-[#667769] shrink-0">배송지</span>
            <span className="font-bold text-[#1C2E22] text-right truncate max-w-[220px]">
              {order.address} {order.detailAddress}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#667769]">결제 수단</span>
            <span className="font-bold text-[#2E5A44]">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center pt-2.5 border-t border-[#EAE1D1]">
            <span className="font-bold text-[#1C2E22]">결제 금액</span>
            <span className="font-black text-[#26533D] text-xl tabular-nums">
              {order.totalPrice.toLocaleString()}원 <span className="text-xs font-normal text-[#5B6E5F]">(무료배송)</span>
            </span>
          </div>
        </div>

        {/* Delivery Timeline info */}
        <div className="bg-[#EBF3ED] p-3.5 rounded-xl text-xs sm:text-sm text-[#2D5E43] flex items-center gap-2.5 text-left mb-6 border border-[#CDE3D5]">
          <Truck className="w-5 h-5 text-[#2E5A44] shrink-0" />
          <div>
            <strong>안내:</strong> 관리자 주문관리 화면에서 본 주문이 실시간으로 확인됩니다.
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 bg-[#26533D] hover:bg-[#1E4331] text-white text-xl font-black rounded-xl transition-colors cursor-pointer shadow-md"
        >
          주문완료 확인 닫기
        </button>

      </div>
    </div>
  );
}
