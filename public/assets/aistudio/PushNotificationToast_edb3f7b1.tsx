import React, { useState, useEffect } from 'react';
import { CheckCircle2, Bell, Clock, ChefHat, Sparkles, ExternalLink, X } from 'lucide-react';
import { OrderConfirmation } from '../types/restaurant';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface PushNotificationToastProps {
  order: OrderConfirmation | null;
  onDismiss: () => void;
  onNewOrder: () => void;
}

export const PushNotificationToast: React.FC<PushNotificationToastProps> = ({
  order,
  onDismiss,
  onNewOrder,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [orderStage, setOrderStage] = useState<'recibido' | 'preparando' | 'listo'>('recibido');
  const [pushPermission, setPushPermission] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  useEffect(() => {
    if (order) {
      setShowToast(true);
      audioHaptic.playPushNotification();

      // Show real browser push notification if permitted
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('fatzzo. · Pago confirmado en Mesa ' + order.tableNumber, {
            body: `Transacción aprobada por ${formatCLP(order.total)}. Tu pedido ya está en cocina.`,
            icon: '/favicon.ico',
          });
        } catch {
          // Ignore notification error
        }
      }

      // Simulate order progress
      const t1 = setTimeout(() => {
        setOrderStage('preparando');
        audioHaptic.playTap();
      }, 5000);

      const t2 = setTimeout(() => {
        setOrderStage('listo');
        audioHaptic.playPushNotification();
      }, 12000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [order]);

  const requestBrowserPush = async () => {
    audioHaptic.playTap();
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushPermission(permission);
        if (permission === 'granted') {
          new Notification('fatzzo. · Notificaciones activadas', {
            body: 'Recibirás avisos instantáneos de tu pedido y boleta electrónica.',
          });
        }
      } catch {
        // Notification API failed
      }
    }
  };

  if (!order) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between p-3 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      {/* Top Native Push Notification Banner */}
      <div
        className={`w-full max-w-sm transition-all duration-500 transform ${
          showToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}
      >
        <div className="p-3.5 rounded-3xl bg-[#111111]/95 text-[#f3f9e9] shadow-2xl border border-white/10 flex items-start gap-3 backdrop-blur-xl">
          <div className="w-9 h-9 rounded-2xl bg-[#c5e19b] text-[#111111] flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#c5e19b]">
                Notificación Push · fatzzo.
              </span>
              <span className="text-[10px] text-white/50">Ahora</span>
            </div>
            <p className="font-semibold text-xs text-white mt-0.5">
              ¡Pago confirmado exitosamente!
            </p>
            <p className="text-[11px] text-[#dcedc2]/80 mt-0.5 leading-snug">
              Tu pago por {formatCLP(order.total)} vía {order.paymentMethod === 'apple-pay' ? 'Apple Pay' : order.bankName || 'Fintoc'} fue aprobado.
            </p>
          </div>

          <button
            onClick={() => setShowToast(false)}
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Digital Receipt & Live Kitchen Progress */}
      <div className="w-full max-w-md my-4 rounded-[36px] bg-white text-[#111111] p-6 shadow-2xl border-2 border-[#c5e19b] text-left space-y-4 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center pb-3 border-b border-[#c5e19b]/40">
          <div className="w-12 h-12 rounded-full bg-[#c5e19b] text-[#111111] flex items-center justify-center mx-auto mb-2 shadow-xs">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#111111]">
            ¡Pedido enviado a cocina!
          </h2>
          <p className="text-xs text-[#394732] mt-1 font-semibold">
            Mesa {order.tableNumber} · Orden #{order.orderId}
          </p>
        </div>

        {/* Live Status Tracker in Diffused Green Box */}
        <div className="p-4 rounded-3xl bg-[#eef7e3] border border-[#c5e19b] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-[#111111]" />
              Estado en cocina
            </span>
            <span className="capitalize text-xs font-extrabold text-[#111111]">
              {orderStage === 'recibido' ? 'En cola de preparación' : orderStage === 'preparando' ? 'Fuego y emplatado' : '¡Listo para servir!'}
            </span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className={`h-2 rounded-full ${orderStage === 'recibido' || orderStage === 'preparando' || orderStage === 'listo' ? 'bg-[#111111]' : 'bg-[#c5e19b]/40'}`} />
            <div className={`h-2 rounded-full ${orderStage === 'preparando' || orderStage === 'listo' ? 'bg-[#111111]' : 'bg-[#c5e19b]/40'}`} />
            <div className={`h-2 rounded-full ${orderStage === 'listo' ? 'bg-[#111111]' : 'bg-[#c5e19b]/40'}`} />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#2f3d28] font-bold">
            <span>1. Recibido</span>
            <span>2. En preparación</span>
            <span>3. Servido a mesa</span>
          </div>
        </div>

        {/* Summary of Items */}
        <div className="space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#111111] block">
            Detalle de tu orden
          </span>
          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
            {order.items.map((cartItem) => (
              <div key={cartItem.id} className="flex items-center justify-between py-1 border-b border-[#c5e19b]/30">
                <span className="text-[#111111] font-semibold">
                  {cartItem.quantity}x {cartItem.item.name}
                </span>
                <span className="font-extrabold tabular-nums text-[#111111]">
                  {formatCLP(cartItem.item.price * cartItem.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-1 text-xs font-medium">
            <div className="flex justify-between text-[#384632]">
              <span>Subtotal:</span>
              <span className="tabular-nums font-bold text-[#111111]">{formatCLP(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#384632]">
              <span>Servicio (3%):</span>
              <span className="tabular-nums font-bold text-[#111111]">{formatCLP(order.serviceFee)}</span>
            </div>
            <div className="flex justify-between text-[#384632]">
              <span>Propina ({order.tipPercent}%):</span>
              <span className="tabular-nums font-bold text-[#111111]">{formatCLP(order.tipAmount)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-[#111111] pt-1.5 border-t border-[#c5e19b]">
              <span>Total Pagado:</span>
              <span className="tabular-nums text-base">{formatCLP(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Browser Push Notification Permission Prompt */}
        {pushPermission !== 'granted' && typeof window !== 'undefined' && 'Notification' in window && (
          <div className="p-3 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#111111]" />
              <span className="text-[11px] text-[#111111] font-bold">
                ¿Recibir alerta cuando el plato esté servido?
              </span>
            </div>
            <button
              onClick={requestBrowserPush}
              className="px-3 py-1 rounded-full bg-[#111111] text-white text-[10px] font-bold"
            >
              Permitir
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              audioHaptic.playTap();
              onNewOrder();
            }}
            className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Pedir más platos o tragos</span>
          </button>

          <button
            onClick={() => {
              audioHaptic.playTap();
              onDismiss();
            }}
            className="w-full py-2.5 rounded-full text-xs font-semibold text-[#44523e] hover:text-[#111111] transition-colors"
          >
            Cerrar comprobante
          </button>
        </div>
      </div>
    </div>
  );
};
