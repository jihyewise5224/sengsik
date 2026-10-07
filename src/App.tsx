/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToDrinkSection } from './components/HowToDrinkSection';
import { ProductSection, defaultBundles } from './components/ProductSection';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OrderModal, OrderDraftInfo } from './components/OrderModal';
import { PaymentModal } from './components/PaymentModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminOrderManager } from './components/AdminOrderManager';
import { CustomerOrderLookupModal } from './components/CustomerOrderLookupModal';
import { AuthModal } from './components/AuthModal';
import { ProductBundle, PlacedOrder, User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPromptMessage, setAuthPromptMessage] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderDraftInfo, setOrderDraftInfo] = useState<OrderDraftInfo | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<ProductBundle>(defaultBundles[0]);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Load saved session if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('haru_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user session:', e);
    }
  }, []);

  const handleOrderInitiated = (bundle?: ProductBundle) => {
    if (bundle) {
      setSelectedBundle(bundle);
    }

    // Must be logged in to order as requested by user
    if (!currentUser) {
      setAuthPromptMessage('주문하시려면 먼저 회원가입 또는 로그인을 진행해 주세요.');
      setIsAuthModalOpen(true);
      return;
    }

    setIsOrderModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('haru_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setIsAuthModalOpen(false);

    // If user was trying to order, proceed directly to order modal
    if (authPromptMessage) {
      setAuthPromptMessage(null);
      setIsOrderModalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('haru_user');
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedToPayment = (draft: OrderDraftInfo) => {
    setOrderDraftInfo(draft);
    setIsOrderModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (order: PlacedOrder) => {
    setIsPaymentModalOpen(false);
    setPlacedOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#243329] flex flex-col font-sans selection:bg-[#2E5A44] selection:text-white">
      {/* 1. Header (Top Bar with "정현정 님 환영합니다" when logged in) */}
      <Header 
        currentUser={currentUser}
        onOrderClick={() => handleOrderInitiated(selectedBundle)}
        onAdminClick={() => setIsAdminModalOpen(true)}
        onLookupClick={() => setIsLookupModalOpen(true)}
        onLoginClick={() => {
          setAuthPromptMessage(null);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* 2. Hero Section: "하루한잔, 간편한 한끼" + 큰 주문하기 버튼 */}
        <Hero onOrderClick={() => handleOrderInitiated(selectedBundle)} />

        {/* 3. Ingredients Section: 국내산 50가지 곡물, 채소로 만든 소개 */}
        <IngredientsSection />

        {/* 4. Target Audience: 이런분께 좋아요 3가지 */}
        <TargetAudienceSection />

        {/* 5. How To Drink: 물이나 우유에 타서 드세요 (1→2→3 순서표시) */}
        <HowToDrinkSection />

        {/* 6. Product 1개와 가격, "주문하기" 버튼 */}
        <ProductSection onOrderWithBundle={handleOrderInitiated} />

        {/* 7. Real Customer Reviews */}
        <CustomerReviews />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 9. Footer */}
      <Footer 
        onAdminClick={() => setIsAdminModalOpen(true)}
        onLookupClick={() => setIsLookupModalOpen(true)}
      />

      {/* 10. Mobile Sticky Order Bar (Height <= 15% viewport) */}
      <MobileBottomBar onOrderClick={() => handleOrderInitiated(selectedBundle)} />

      {/* 11. Login & Sign-up Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthPromptMessage(null);
        }}
        onSuccess={handleAuthSuccess}
        promptMessage={authPromptMessage}
      />

      {/* 12. Step 1: Order Draft Form Modal (Address & Bundle) */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialBundle={selectedBundle}
        currentUser={currentUser}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* 13. Step 2: Dedicated Practice Payment Modal (카드 1111-2222-3333-4444, 네이버/토스/카카오페이) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderInfo={orderDraftInfo}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 14. Step 3: Order Confirmation Success Screen ("주문완료" & ORD-YYYYMMDD-XXXX) */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* 15. Admin Real-Time Orders Management Panel */}
      <AdminOrderManager
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* 16. Customer Self-Order Lookup Modal */}
      <CustomerOrderLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />
    </div>
  );
}
