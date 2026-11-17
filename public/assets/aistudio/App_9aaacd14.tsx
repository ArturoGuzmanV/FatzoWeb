/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { CategoryGrid } from './components/CategoryGrid';
import { DishCard } from './components/DishCard';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FintocModal } from './components/FintocModal';
import { PushNotificationToast } from './components/PushNotificationToast';
import { TableSelectorModal } from './components/TableSelectorModal';
import { WaiterCallModal } from './components/WaiterCallModal';
import { IPhoneFrame } from './components/IPhoneFrame';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { MenuItem, CartItem, PaymentMethod, OrderConfirmation } from './types/restaurant';
import { audioHaptic, formatCLP } from './utils/audioHaptic';

export default function App() {
  // Mobile Device Frame view is enabled by default for authentic iPhone mockup
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(true);

  // Table state
  const [currentTable, setCurrentTable] = useState(RESTAURANT_INFO.tables[0]);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);

  // Navigation & Filtering
  const [activeCategoryId, setActiveCategoryId] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);

  // Modals & Drawers
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFintocOpen, setIsFintocOpen] = useState(false);
  const [fintocData, setFintocData] = useState<{ total: number; tipAmount: number; tipPercent: number } | null>(null);

  // Cart & Orders
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [splitGuests, setSplitGuests] = useState<number>(1);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Filtered menu items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategoryId !== 'todos' && item.category !== activeCategoryId) {
        return false;
      }
      // Dietary filter
      if (selectedDietary && (!item.dietary || !item.dietary.includes(selectedDietary as any))) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [activeCategoryId, selectedDietary, searchQuery]);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number, selectedOption?: string, notes?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedOption === selectedOption && ci.notes === notes
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          item,
          quantity,
          selectedOption,
          notes,
        },
      ];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 1);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  // Checkout flow handlers
  const handleOpenFintocGateway = (total: number, tipAmount: number, tipPercent: number) => {
    setFintocData({ total, tipAmount, tipPercent });
    setIsCheckoutOpen(false);
    setIsFintocOpen(true);
  };

  const handleFintocSuccess = (details: { method: 'fintoc' | 'apple-pay'; bank?: string }) => {
    if (!fintocData) return;
    const order: OrderConfirmation = {
      orderId: Math.floor(1000 + Math.random() * 9000).toString(),
      tableNumber: currentTable.name,
      timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal: cartSubtotal,
      serviceFee: Math.round(cartSubtotal * 0.03),
      tipAmount: fintocData.tipAmount,
      tipPercent: fintocData.tipPercent,
      total: fintocData.total,
      paymentMethod: details.method,
      bankName: details.bank,
      status: 'recibido',
    };

    setConfirmedOrder(order);
    setIsFintocOpen(false);
    setCartItems([]);
  };

  const handleTablePaySuccess = (
    paymentMethod: PaymentMethod,
    tipAmount: number,
    tipPercent: number,
    total: number
  ) => {
    const order: OrderConfirmation = {
      orderId: Math.floor(1000 + Math.random() * 9000).toString(),
      tableNumber: currentTable.name,
      timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal: cartSubtotal,
      serviceFee: Math.round(cartSubtotal * 0.03),
      tipAmount,
      tipPercent,
      total,
      paymentMethod: 'mesa',
      status: 'recibido',
    };

    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  // Main UI Content inside phone or screen
  const mainAppContent = (
    <div className="relative min-h-full flex flex-col justify-between bg-white text-[#111111]">
      {/* Top Navbar */}
      <Header
        restaurantName={RESTAURANT_INFO.name}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWaiterCall={() => setIsWaiterModalOpen(true)}
        isMobileDeviceView={isMobileDeviceView}
        onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
      />

      <div className="flex-1 space-y-4 pb-20 bg-white">
        {/* Search & Dietary Filter Bar */}
        <div className="px-4 pt-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5843]" />
            <input
              type="text"
              placeholder="Buscar platos o ingredientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f6fbf0] border border-[#c5e19b] text-xs font-medium text-[#111111] placeholder:text-[#5f7058] focus:outline-none focus:ring-2 focus:ring-[#c5e19b] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#111111] hover:text-[#5e8b23]"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] text-[#2b3724] font-bold pr-1 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3 h-3 text-[#111111]" />
              Filtros:
            </span>
            {[
              { id: null, label: 'Todos' },
              { id: 'vegetariano', label: 'Vegetariano' },
              { id: 'sin-gluten', label: 'Sin Gluten' },
              { id: 'vegano', label: 'Vegano' },
              { id: 'mariscos', label: 'Mariscos' },
            ].map((filter) => {
              const isSelected = selectedDietary === filter.id;
              return (
                <button
                  key={filter.label}
                  onClick={() => {
                    audioHaptic.playTap();
                    setSelectedDietary(filter.id);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#c5e19b] text-[#111111] border-2 border-[#111111] shadow-2xs'
                      : 'bg-[#eef7e3] text-[#111111] border border-[#c5e19b]/60 hover:bg-[#e2f2cf]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Exploration Grid with Mesa 1 · Salón Principal placed right above Explorar Menú */}
        {activeCategoryId === 'todos' && !searchQuery && (
          <CategoryGrid
            categories={CATEGORIES}
            onSelectCategory={(id) => setActiveCategoryId(id)}
            tableName={currentTable.name}
            tableZone={currentTable.zone}
            onOpenTableSelect={() => setIsTableModalOpen(true)}
          />
        )}

        {/* When filtered or searching: show Table indicator button above section */}
        {(activeCategoryId !== 'todos' || searchQuery) && (
          <div className="px-4 pt-1">
            <button
              onClick={() => {
                audioHaptic.playTap();
                setIsTableModalOpen(true);
              }}
              className="group inline-flex items-center gap-2 text-xs font-bold text-[#111111] bg-[#eef7e3] hover:bg-[#e2f3cc] border border-[#c5e19b] px-3.5 py-1.5 rounded-full shadow-2xs transition-all active:scale-95"
              title="Cambiar de mesa"
            >
              <span className="w-2 h-2 rounded-full bg-[#75b025] group-hover:scale-125 transition-transform" />
              <span className="font-extrabold uppercase tracking-wider">{currentTable.name}</span>
              <span className="text-[#3b4934] font-medium">· {currentTable.zone}</span>
              <svg
                className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}

        {/* Horizontal Category Nav */}
        <CategoryNav
          categories={CATEGORIES}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(id) => setActiveCategoryId(id)}
        />

        {/* Dishes List Section */}
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between pt-1">
            <h2 className="font-serif text-xl font-bold text-[#111111] tracking-tight">
              {activeCategoryId === 'todos'
                ? 'Nuestra Carta'
                : CATEGORIES.find((c) => c.id === activeCategoryId)?.name}
            </h2>
            <span className="text-xs font-semibold text-[#303d27] bg-[#eef7e3] px-2.5 py-0.5 rounded-full border border-[#c5e19b]">
              {filteredDishes.length} {filteredDishes.length === 1 ? 'opción' : 'opciones'}
            </span>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center rounded-3xl bg-[#f6fbf0] border border-dashed border-[#c5e19b]">
              <p className="font-serif text-base font-bold text-[#111111]">
                No se encontraron platos
              </p>
              <p className="text-xs text-[#3b4934] mt-1">
                Prueba cambiando el término de búsqueda o retirando los filtros dietarios.
              </p>
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setSearchQuery('');
                  setSelectedDietary(null);
                  setActiveCategoryId('todos');
                }}
                className="mt-3 px-4 py-2 rounded-full text-xs font-bold bg-[#c5e19b] text-[#111111] border border-[#111111]"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDishes.map((item) => {
                const itemInCart = cartItems.find((ci) => ci.item.id === item.id);
                return (
                  <DishCard
                    key={item.id}
                    item={item}
                    onSelect={(dish) => setSelectedDish(dish)}
                    onQuickAdd={handleQuickAdd}
                    cartQuantity={itemInCart ? itemInCart.quantity : 0}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Bar inside phone when Cart has items */}
      {cartItems.length > 0 && !isCartOpen && !isCheckoutOpen && !isFintocOpen && (
        <div className="sticky bottom-2 left-0 right-0 z-20 px-3 pb-2 flex justify-center pointer-events-none">
          <div className="w-full max-w-md pointer-events-auto">
            <button
              onClick={() => {
                audioHaptic.playTap();
                setIsCartOpen(true);
              }}
              className="w-full py-4 px-5 rounded-full bg-[#c5e19b] hover:bg-[#b8dd82] text-[#111111] border-2 border-[#111111] shadow-[0_6px_25px_rgba(197,225,155,0.7)] flex items-center justify-between active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-extrabold flex items-center justify-center">
                  {totalCartCount}
                </span>
                <span className="font-extrabold text-xs sm:text-sm">Ver pedido de la mesa</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tabular-nums">
                  {formatCLP(cartSubtotal)}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Modals & Bottom Drawers confined to the phone frame */}
      <DishModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        splitGuestsCount={splitGuests}
        onUpdateSplitGuests={(count) => setSplitGuests(count)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        items={cartItems}
        tableNumber={currentTable.name}
        onConfirmOrder={handleTablePaySuccess}
        onOpenFintocGateway={handleOpenFintocGateway}
      />

      {fintocData && (
        <FintocModal
          isOpen={isFintocOpen}
          onClose={() => setIsFintocOpen(false)}
          totalAmount={fintocData.total}
          tipAmount={fintocData.tipAmount}
          tableNumber={currentTable.name}
          onPaymentSuccess={handleFintocSuccess}
        />
      )}

      <PushNotificationToast
        order={confirmedOrder}
        onDismiss={() => setConfirmedOrder(null)}
        onNewOrder={() => setConfirmedOrder(null)}
      />

      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        currentTableId={currentTable.id}
        onSelectTable={(table) => setCurrentTable(table)}
      />

      <WaiterCallModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        tableName={currentTable.name}
      />
    </div>
  );

  // Render inside authentic iPhone 16 Pro mockup by default
  if (isMobileDeviceView) {
    return (
      <IPhoneFrame
        activeOrderCount={totalCartCount}
        restaurantName={RESTAURANT_INFO.name}
        tableName={currentTable.name}
      >
        {mainAppContent}
      </IPhoneFrame>
    );
  }

  // Expanded viewport view fallback
  return (
    <div className="min-h-screen bg-[#f2fae8] p-4 flex items-center justify-center transition-colors">
      <div className="max-w-2xl w-full mx-auto min-h-screen relative bg-white rounded-3xl shadow-xl overflow-hidden border border-[#c5e19b]">
        {mainAppContent}
      </div>
    </div>
  );
}
