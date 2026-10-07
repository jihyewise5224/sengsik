export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ProductBundle {
  id: string;
  name: string;
  subtitle: string;
  count: number;
  originalPrice: number;
  price: number;
  badge?: string;
  isPopular?: boolean;
}

export interface OrderFormData {
  bundleId: string;
  buyerName: string;
  phone: string;
  address: string;
  detailAddress: string;
  requestNote: string;
  paymentMethod: 'card' | 'simple' | 'bank';
}

export interface PlacedOrder {
  orderNumber: string;
  bundle: ProductBundle;
  buyerName: string;
  phone: string;
  address: string;
  detailAddress: string;
  requestNote?: string;
  totalPrice: number;
  paymentMethod: string;
  status: '주문접수' | '결제확인' | '배송준비' | '배송중' | '배송완료' | '주문취소' | string;
  carrier?: string;
  trackingNumber?: string;
  createdAt: string;
  formattedDate?: string;
}
