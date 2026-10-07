import { useState } from 'react';
import { X, Search, Package, Phone, Truck, CheckCircle2, Clock } from 'lucide-react';
import { PlacedOrder } from '../types';

interface CustomerOrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerOrderLookupModal({ isOpen, onClose }: CustomerOrderLookupModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<PlacedOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 8) {
      setErrorMsg('주문 시 입력하신 휴대폰 번호를 올바르게 입력해 주세요.');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    setSearched(true);

    try {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const res = await fetch(`/api/orders?phone=${cleanPhone}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Order lookup failed:', err);
      setErrorMsg('주문 조회 중 통신 오류가 발생했습니다.');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F0] border-b border-[#E8DFC8] flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#2A5C41] bg-[#E5EFE7] px-2.5 py-0.5 rounded-md">
              고객 안심 서비스
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1C2E22] mt-1">
              내 주문 및 배송 조회
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          
          <form onSubmit={handleLookup} className="space-y-3">
            <label className="block text-base sm:text-lg font-bold text-[#1C2E22]">
              주문 시 입력하신 휴대폰 번호
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="010-1234-5678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3.5 bg-[#2E5A44] hover:bg-[#234534] disabled:bg-[#8EA093] text-white text-base sm:text-lg font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                <span>조회</span>
              </button>
            </div>
            {errorMsg && (
              <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
            )}
          </form>

          {/* Results Area */}
          {searched && (
            <div className="space-y-4 pt-2">
              {isLoading ? (
                <div className="py-12 text-center text-[#5C6E5F]">
                  주문 내역을 검색하고 있습니다...
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm font-bold text-[#2A5C41]">
                    총 {orders.length}건의 주문이 확인되었습니다.
                  </div>
                  {orders.map((o) => (
                    <div
                      key={o.orderNumber}
                      className="bg-white p-5 rounded-2xl border-2 border-[#E5DAC3] shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9DA]">
                        <span className="font-mono font-bold text-[#1C2E22]">
                          {o.orderNumber}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-md bg-[#EBF3ED] text-[#255239]">
                          {o.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm sm:text-base text-[#465A49]">
                        <div><strong>상품:</strong> {o.bundle.name}</div>
                        <div><strong>받는 분:</strong> {o.buyerName}</div>
                        <div><strong>배송지:</strong> {o.address} {o.detailAddress}</div>
                        <div><strong>결제금액:</strong> {o.totalPrice.toLocaleString()}원</div>
                        {o.trackingNumber && (
                          <div className="p-2.5 bg-[#F6F1E6] rounded-xl text-xs sm:text-sm font-bold text-[#255239] flex items-center gap-2 mt-2">
                            <Truck className="w-4 h-4 shrink-0" />
                            <span>우체국택배 송장: {o.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center bg-white rounded-2xl border border-[#E5DAC3] p-6 text-[#6B7D6E]">
                  <Package className="w-10 h-10 mx-auto mb-2 text-[#C0B4A0]" />
                  <p className="font-bold text-lg text-[#1C2E22]">일치하는 주문 내역이 없습니다.</p>
                  <p className="text-sm mt-1">입력하신 휴대폰 번호를 다시 확인해 주세요.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
