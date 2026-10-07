import { useState, useEffect, useRef } from 'react';
import { 
  X, RefreshCw, Search, Phone, MapPin, Truck, CheckCircle2, 
  AlertCircle, Clock, Package, Trash2, ArrowUpRight, 
  Check, Bell, ShieldCheck, Download, Printer 
} from 'lucide-react';
import { PlacedOrder } from '../types';

interface AdminOrderManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Gentle Web Audio notification chime when a new order arrives
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
}

export function AdminOrderManager({ isOpen, onClose }: AdminOrderManagerProps) {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingOrderNum, setUpdatingOrderNum] = useState<string | null>(null);
  const [newOrderAlert, setNewOrderAlert] = useState<PlacedOrder | null>(null);
  const [highlightedOrderNum, setHighlightedOrderNum] = useState<string | null>(null);
  const previousOrderCountRef = useRef<number | null>(null);

  // Fetch orders from server
  const fetchOrders = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data: PlacedOrder[] = await res.json();
        
        // Detect if new order was added from outside
        if (
          previousOrderCountRef.current !== null && 
          data.length > previousOrderCountRef.current
        ) {
          const newest = data[0];
          setNewOrderAlert(newest);
          setHighlightedOrderNum(newest.orderNumber);
          playNotificationChime();

          // Auto clear alert after 6 seconds
          setTimeout(() => {
            setNewOrderAlert(null);
          }, 6000);
        }

        previousOrderCountRef.current = data.length;
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // Real-time synchronization: SSE + 2.5s Polling
  useEffect(() => {
    if (!isOpen) return;

    fetchOrders(false);

    // 1. SSE Connection for instant push
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/orders/events');
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'new_order' || payload.type === 'order_updated' || payload.type === 'order_deleted') {
            fetchOrders(true);
          }
        } catch (e) {
          // ignore
        }
      };
    } catch (e) {
      console.warn('SSE not available, relying on auto-polling:', e);
    }

    // 2. Continuous 2.5s auto-polling fallback
    const pollInterval = setInterval(() => {
      fetchOrders(true);
    }, 2500);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Change Status Handler (e.g. "배송중", "배송완료")
  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    try {
      setUpdatingOrderNum(orderNumber);
      const res = await fetch(`/api/orders/${orderNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map((o) => (o.orderNumber === orderNumber ? updated : o)));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingOrderNum(null);
    }
  };

  const handleDeleteOrder = async (orderNumber: string) => {
    if (!window.confirm(`주문 [${orderNumber}] 건을 정말 취소/삭제하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/orders/${orderNumber}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter((o) => o.orderNumber !== orderNumber));
        if (previousOrderCountRef.current !== null) {
          previousOrderCountRef.current -= 1;
        }
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch =
      !searchTerm ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm) ||
      o.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.bundle.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const newOrderCount = orders.filter((o) => o.status === '주문접수').length;
  const shippingCount = orders.filter((o) => o.status === '배송중').length;
  const completedCount = orders.filter((o) => o.status === '배송완료').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-6xl bg-[#FDFBF7] rounded-3xl border-2 border-[#E5DAC3] shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real-time New Order Toast Alert */}
        {newOrderAlert && (
          <div className="bg-emerald-600 text-white px-6 py-3.5 flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold">
                <Bell className="w-4 h-4 animate-bounce" />
              </span>
              <div>
                <strong className="text-base font-black">새 주문이 방금 도착했습니다!</strong>
                <span className="ml-2 text-sm text-emerald-100">
                  [{newOrderAlert.orderNumber}] {newOrderAlert.buyerName} 님 · {newOrderAlert.totalPrice.toLocaleString()}원 ({newOrderAlert.bundle.name})
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNewOrderAlert(null)}
              className="text-white hover:text-emerald-200 cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F0] border-b border-[#E8DFC8] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-bold text-[#2A5C41] bg-[#E5EFE7] px-2.5 py-0.5 rounded-md">
                실시간 자동 감지 중 (새로고침 불필요)
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1C2E22] tracking-tight">
              하루생식 판매자 주문관리 센터
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchOrders(false)}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#D5C9B3] text-[#2E5A44] font-bold text-xs sm:text-sm hover:bg-[#F3EDE2] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">수동 새로고침</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#EFE8DA] hover:bg-[#E2D8C3] text-[#2C4132] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 sm:px-6 bg-[#F6F1E6] border-b border-[#E5DAC3] shrink-0">
          <div className="bg-white p-3.5 rounded-2xl border border-[#DFD3BB]">
            <div className="text-xs text-[#667769] font-bold">전체 주문</div>
            <div className="text-2xl font-black text-[#1C2E22] tabular-nums mt-0.5">
              {orders.length} <span className="text-xs font-normal">건</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#DFD3BB]">
            <div className="text-xs text-amber-700 font-bold">신규 주문접수</div>
            <div className="text-2xl font-black text-amber-600 tabular-nums mt-0.5">
              {newOrderCount} <span className="text-xs font-normal">건</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#DFD3BB]">
            <div className="text-xs text-blue-700 font-bold">배송중</div>
            <div className="text-2xl font-black text-blue-600 tabular-nums mt-0.5">
              {shippingCount} <span className="text-xs font-normal">건</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#DFD3BB]">
            <div className="text-xs text-emerald-700 font-bold">배송완료</div>
            <div className="text-2xl font-black text-emerald-600 tabular-nums mt-0.5">
              {completedCount} <span className="text-xs font-normal">건</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#DFD3BB] col-span-2 sm:col-span-1">
            <div className="text-xs text-[#26533D] font-bold">총 주문 금액</div>
            <div className="text-xl sm:text-2xl font-black text-[#26533D] tabular-nums mt-0.5">
              {totalRevenue.toLocaleString()} <span className="text-xs font-normal">원</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:px-6 bg-[#FAF7F0] border-b border-[#E8DFC8] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E8F81]" />
            <input
              type="text"
              placeholder="주문번호, 주문자명, 전화번호, 주소 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base rounded-xl border border-[#D5C9B3] bg-white text-[#1C2E22] focus:outline-none focus:ring-2 focus:ring-[#2E5A44]"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: '전체' },
              { id: '주문접수', label: '주문접수' },
              { id: '배송중', label: '배송중' },
              { id: '배송완료', label: '배송완료' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-[#2E5A44] text-white shadow-xs'
                    : 'bg-white border border-[#DFD3BB] text-[#556958] hover:bg-[#F2ECE0]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Orders Table View requested by User */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {isLoading && orders.length === 0 ? (
            <div className="py-24 text-center text-[#6A7B6E]">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-3 text-[#2E5A44]" />
              <p className="text-lg font-bold">주문 목록을 실시간으로 가져오는 중입니다...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#E5DAC3] p-8 text-[#6A7B6E]">
              <Package className="w-12 h-12 mx-auto mb-3 text-[#B0A38E]" />
              <p className="text-xl font-bold text-[#1C2E22]">조회된 주문이 없습니다.</p>
              <p className="text-sm mt-1 text-[#5E7162]">
                새 주문이 접수되면 별도의 새로고침 없이 화면에 즉시 자동으로 나타납니다.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border-2 border-[#E5DAC3] bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-[#F6F1E6] border-b-2 border-[#E5DAC3] text-xs font-black text-[#3C5241] uppercase tracking-wider">
                    <th className="py-3.5 px-4">주문번호 / 일시</th>
                    <th className="py-3.5 px-4">주문자 (성함/연락처/배송지)</th>
                    <th className="py-3.5 px-4">상품 (수량)</th>
                    <th className="py-3.5 px-4 text-right">금액</th>
                    <th className="py-3.5 px-4 text-center">현재 상태</th>
                    <th className="py-3.5 px-4 text-center min-w-[200px]">상태 변경 관리</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EFE8DC]">
                  {filteredOrders.map((order) => {
                    const isHighlighted = highlightedOrderNum === order.orderNumber;
                    const isUpdating = updatingOrderNum === order.orderNumber;

                    return (
                      <tr 
                        key={order.orderNumber}
                        className={`transition-colors hover:bg-[#FAF8F3] ${
                          isHighlighted ? 'bg-emerald-50 ring-2 ring-emerald-400' : ''
                        }`}
                      >
                        {/* 1. 주문번호 / 일시 */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-mono font-extrabold text-[#1C2E22] text-sm sm:text-base">
                            {order.orderNumber}
                          </div>
                          <div className="text-xs text-[#708072] mt-0.5">
                            {order.formattedDate || new Date(order.createdAt).toLocaleString('ko-KR')}
                          </div>
                          <div className="text-[11px] font-semibold text-[#2E5A44] bg-[#E8F2EC] px-2 py-0.5 rounded inline-block mt-1">
                            {order.paymentMethod}
                          </div>
                        </td>

                        {/* 2. 주문자 (성함, 연락처, 주소) */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-extrabold text-[#1C2E22] text-base flex items-center gap-2">
                            <span>{order.buyerName}</span>
                            <a
                              href={`tel:${order.phone}`}
                              className="text-xs font-bold text-[#2E5A44] hover:underline bg-[#E8F2EC] px-2 py-0.5 rounded flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{order.phone}</span>
                            </a>
                          </div>

                          <div className="text-xs sm:text-sm text-[#4E6152] mt-1 leading-snug">
                            <span className="font-medium">{order.address} {order.detailAddress}</span>
                          </div>

                          {order.requestNote && (
                            <div className="text-xs text-[#798A7C] mt-1 italic">
                              요청: {order.requestNote}
                            </div>
                          )}
                        </td>

                        {/* 3. 상품 정보 */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-[#1C2E22]">
                            {order.bundle.name}
                          </div>
                          <div className="text-xs text-[#637566]">
                            총 {order.bundle.count * 30}포 ({order.bundle.count}박스)
                          </div>
                        </td>

                        {/* 4. 금액 */}
                        <td className="py-4 px-4 align-top text-right">
                          <div className="font-black text-[#26533D] text-base sm:text-lg tabular-nums">
                            {order.totalPrice.toLocaleString()}원
                          </div>
                          <div className="text-xs text-[#6B7D6E]">
                            무료배송
                          </div>
                        </td>

                        {/* 5. 현재 상태 뱃지 */}
                        <td className="py-4 px-4 align-top text-center">
                          <span 
                            className={`inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                              order.status === '배송완료'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : order.status === '배송중'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : order.status === '배송준비'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : order.status === '결제확인'
                                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                : order.status === '주문취소'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        {/* 6. 상태 변경 액션 버튼 ("배송중" / "배송완료") */}
                        <td className="py-4 px-4 align-top text-center">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                            
                            {/* "배송중" 변경 버튼 */}
                            <button
                              type="button"
                              disabled={isUpdating || order.status === '배송중'}
                              onClick={() => handleStatusChange(order.orderNumber, '배송중')}
                              className={`w-full sm:w-auto px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                order.status === '배송중'
                                  ? 'bg-blue-600 text-white shadow-xs cursor-default'
                                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                              }`}
                              title="상태를 '배송중'으로 변경"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>배송중</span>
                            </button>

                            {/* "배송완료" 변경 버튼 */}
                            <button
                              type="button"
                              disabled={isUpdating || order.status === '배송완료'}
                              onClick={() => handleStatusChange(order.orderNumber, '배송완료')}
                              className={`w-full sm:w-auto px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                                order.status === '배송완료'
                                  ? 'bg-emerald-600 text-white shadow-xs cursor-default'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              }`}
                              title="상태를 '배송완료'로 변경"
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>배송완료</span>
                            </button>

                            {/* 삭제 버튼 */}
                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(order.orderNumber)}
                              className="p-1.5 text-[#9AA89D] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="주문 삭제/취소"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Dashboard Footer */}
        <div className="px-6 py-3 bg-[#FAF7F0] border-t border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F8071] gap-2 shrink-0">
          <div>
            * 외부에서 손님이 주문을 접수하면 <strong>새로고침 없이 실시간으로 목록 맨 위에 즉시 추가</strong>됩니다.
          </div>
          <div className="font-semibold text-[#2E5A44]">
            실시간 자동 스트림 활성화됨 (SSE & 2.5s Auto-sync)
          </div>
        </div>

      </div>
    </div>
  );
}
