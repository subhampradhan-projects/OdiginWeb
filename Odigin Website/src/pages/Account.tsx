import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Package, Clock, CheckCircle, Truck, Box } from 'lucide-react';

const STATUS_ICONS = {
  'Pending': Clock,
  'Processing': Box,
  'Shipped': Truck,
  'Delivered': CheckCircle,
  'Cancelled': Clock
};

export default function Account() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black text-center px-6">
        <div>
           <h1 className="text-4xl font-serif italic mb-6">Access Required</h1>
           <p className="text-[12px] uppercase tracking-[0.4em] text-white/30">Please sign in to view your archive.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-20">
           <h1 className="text-5xl font-serif italic mb-6">Your Account</h1>
           <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Presence: {user.email}</p>
        </header>

        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-[11px] uppercase tracking-[0.4em] text-white/60">Order Archive</h2>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] text-white/30">{orders.length} Objects</span>
          </div>

          {loading ? (
            <div className="py-24 text-center text-white/20 uppercase tracking-widest text-[11px]">Syncing Archives...</div>
          ) : orders.length === 0 ? (
            <div className="py-24 text-center bg-white/[0.01] border border-white/5 rounded-lg">
               <p className="text-[11px] uppercase tracking-widest text-white/30 italic font-light">No narratives have been recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => {
                const StatusIcon = STATUS_ICONS[order.status as keyof typeof STATUS_ICONS] || Clock;
                return (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:border-white/10 transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-2 bg-white/5 rounded-full text-white/40">
                             <StatusIcon size={14} strokeWidth={1.5} />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/80">{order.status}</span>
                          <span className="text-white/10">|</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                           {order.items.map((item, idx) => (
                             <div key={idx} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg pr-6">
                               <div className="w-12 h-16 overflow-hidden bg-black">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-60" referrerPolicy="no-referrer" />
                               </div>
                               <div>
                                 <p className="text-[10px] uppercase tracking-widest font-medium text-white/80">{item.name}</p>
                                 <p className="text-[9px] text-white/30 uppercase tracking-widest">Qty: {item.quantity}</p>
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end border-l border-white/5 pl-8 md:min-w-[120px]">
                        <div className="text-right">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-1">Total Value</p>
                          <p className="text-xl font-light font-serif italic">${order.total}</p>
                        </div>
                        <p className="text-[9px] text-white/20 uppercase tracking-widest mt-8">Ref: #{order.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
