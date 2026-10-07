import { useState, useEffect } from 'react';
import { X, Check, Truck, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { ProductBundle, User } from '../types';
import { defaultBundles } from './ProductSection';

export interface OrderDraftInfo {
  bundle: ProductBundle;
  buyerName: string;
  phone: string;
  address: string;
  detailAddress: string;
  requestNote: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBundle?: ProductBundle;
  currentUser?: User | null;
  onProceedToPayment: (orderDraft: OrderDraftInfo) => void;
}

export function OrderModal({
  isOpen,
  onClose,
  initialBundle,
  currentUser,
  onProceedToPayment
}: OrderModalProps) {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    initialBundle ? initialBundle.id : 'bundle-1'
  );
  const [buyerName, setBuyerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [requestNote, setRequestNote] = useState('문 앞에 두고 벨 눌러주세요');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (currentUser?.name && !buyerName) {
      setBuyerName(currentUser.name);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const currentBundle =
    defaultBundles.find((b) => b.id === selectedBundleId) || defaultBundles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!buyerName.trim()) {
      newErrors.buyerName = '받는 분 성함을 입력해 주세요.';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = '올바른 연락처(10~11자리 숫자)를 입력해 주세요.';
    }
    if (!address.trim()) {
      newErrors.address = '배송지 주소를 입력해 주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onProceedToPayment({
      bundle: currentBundle,
      buyerName: buyerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      detailAddress: detailAddress.trim(),
      requestNote
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#FAF7F0] border-b border-[#E8DFC8] flex items-center justify-between shrink-0">
          <div>
            <div className="inline-block text-xs sm:text-sm font-bold text-[#2A5C41] bg-[#E5EFE7] px-3 py-0.5 rounded-md mb-1">
              1단계: 배송 정보 입력
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1C2E22] tracking-tight">
              하루생식 주문서 작성
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body with comfortable spacing */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-7">
          
          {/* 1. Bundle Selection */}
          <div className="space-y-3 pt-1">
            <label className="block text-lg sm:text-xl font-bold text-[#1C2E22]">
              1. 상품 및 수량 선택
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {defaultBundles.map((b) => {
                const isSelected = b.id === selectedBundleId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBundleId(b.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#2E5A44] bg-[#F1F8F4] ring-2 ring-[#2E5A44]/20 shadow-xs'
                        : 'border-[#E5DAC3] bg-white hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-base sm:text-lg text-[#1C2E22]">
                          {b.name.split(' ')[0]}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#2E5A44] text-white flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-[#5B6D5E]">
                        {b.count * 30}포 ({b.count}개월분)
                      </div>
                    </div>
                    <div className="text-xl font-black text-[#26533D] mt-3 tabular-nums">
                      {b.price.toLocaleString()}원
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Delivery Recipient Info */}
          <div className="space-y-4">
            <label className="block text-lg sm:text-xl font-bold text-[#1C2E22]">
              2. 배송 정보 입력
            </label>

            <div>
              <label className="block text-sm sm:text-base font-bold text-[#3B4E40] mb-1.5">
                받는 분 성함 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 정현정"
                value={buyerName}
                onChange={(e) => {
                  setBuyerName(e.target.value);
                  if (errors.buyerName) setErrors({ ...errors, buyerName: '' });
                }}
                className="w-full px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44] transition-all"
              />
              {errors.buyerName && (
                <p className="text-sm text-red-600 font-medium mt-1">{errors.buyerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-[#3B4E40] mb-1.5">
                휴대폰 번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="예: 010-1234-5678"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className="w-full px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44] transition-all"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 font-medium mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-[#3B4E40] mb-1.5">
                기본 주소 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: 서울시 강남구 테헤란로 123"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                className="w-full px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44] transition-all"
              />
              {errors.address && (
                <p className="text-sm text-red-600 font-medium mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-[#3B4E40] mb-1.5">
                상세 주소 (동/호수)
              </label>
              <input
                type="text"
                placeholder="예: 101동 202호 (선택사항)"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                className="w-full px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-[#3B4E40] mb-1.5">
                배송 요청사항
              </label>
              <select
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                className="w-full px-4 py-3.5 text-base sm:text-lg rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44] cursor-pointer"
              >
                <option value="문 앞에 두고 벨 눌러주세요">문 앞에 두고 벨 눌러주세요</option>
                <option value="배송 전 미리 연락 부탁드립니다">배송 전 미리 연락 부탁드립니다</option>
                <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                <option value="직접 수령하겠습니다">직접 수령하겠습니다</option>
              </select>
            </div>
          </div>

          {/* Order Summary Receipt Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F6F1E6] border border-[#DFD3BB] space-y-3">
            <div className="flex justify-between text-base text-[#4C5E50]">
              <span>선택 상품</span>
              <span className="font-bold text-[#1C2E22]">{currentBundle.name}</span>
            </div>
            <div className="flex justify-between text-base text-[#4C5E50]">
              <span>사은품</span>
              <span className="font-bold text-[#2E5A44] flex items-center gap-1">
                <Gift className="w-4 h-4" /> 전용 보틀 무료 증정
              </span>
            </div>
            <div className="flex justify-between text-base text-[#4C5E50]">
              <span>배송비</span>
              <span className="font-bold text-[#2E5A44]">0원 (전 지역 무료배송)</span>
            </div>
            <div className="pt-3 border-t border-[#E5DAC3] flex justify-between items-baseline">
              <span className="text-lg font-bold text-[#1C2E22]">최종 결제 금액</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#26533D] tabular-nums">
                  {currentBundle.price.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-[#1C2E22]">원</span>
              </div>
            </div>
          </div>

          {/* Big Proceed to Payment Button */}
          <div>
            <button
              type="submit"
              className="w-full py-5 sm:py-6 bg-[#26533D] hover:bg-[#1E4331] text-white text-2xl sm:text-3xl font-black rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3"
            >
              <span>{currentBundle.price.toLocaleString()}원 결제화면으로 이동</span>
              <ArrowRight className="w-7 h-7" />
            </button>

            <p className="text-center text-xs sm:text-sm text-[#738274] mt-2.5">
              * 다음 화면에서 <strong>연습용 결제창(카드/네이버·카카오·토스페이)</strong>이 열리며, 실제 돈은 나가지 않습니다.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
