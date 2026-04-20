import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ExternalLink } from 'lucide-react';

const STATUS_COLORS = {
  'Pending': 'text-yellow-500 bg-yellow-500/10',
  'Processing': 'text-blue-500 bg-blue-500/10',
  'Shipped': 'text-purple-500 bg-purple-500/10',
  'Delivered': 'text-green-500 bg-green-500/10',
  'Cancelled': 'text-red-500 bg-red-500/10'
};

const STATUS_ICONS = {
  'Pending': Clock,
  'Processing': Package,
  'Shipped': Truck,
  'Delivered': CheckCircle,
  'Cancelled': Clock
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const isSeller = user?.email === 'subhampradhancollective@gmail.com';

  useEffect(() => {
    if (!isSeller) return;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isSeller]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  if (!isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black text-center px-6">
        <div>
           <h1 className="text-4xl font-serif italic mb-6">Restricted</h1>
           <p className="text-[12px] uppercase tracking-[0.4em] text-white/30">This narrative is for the atelier leadership only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <h1 className="text-5xl font-serif italic mb-6">Seller Dashboard</h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Monitoring {orders.length} active narratives</p>
           </div>
        </header>

        {loading ? (
          <div className="py-48 text-center text-white/20 uppercase tracking-widest text-[11px]">Retrieving Data...</div>
        ) : orders.length === 0 ? (
          <div className="py-48 text-center bg-white/[0.02] border border-white/5 rounded-2xl">
             <p className="text-[11px] uppercase tracking-widest text-white/30 italic">No orders recorded in the current cycle.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="hidden md:grid grid-cols-6 px-10 py-6 text-[10px] uppercase tracking-[0.4em] text-white/30 border-b border-white/5">
               <div className="col-span-2">Order Narrative</div>
               <div>Status</div>
               <div>Value</div>
               <div>Timestamp</div>
               <div className="text-right">Action</div>
            </div>
            
            {orders.map((order) => (
              <div key={order.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-6 items-center px-6 md:px-10 py-8 gap-6 md:gap-0">
                  <div className="col-span-2 flex items-center gap-6">
                     <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                        <Package size={20} strokeWidth={1} />
                     </div>
                     <div>
                        <h3 className="text-[11px] uppercase tracking-widest font-medium mb-1">Order #{order.id.slice(0, 8)}</h3>
                        <p className="text-[10px] text-white/40 tracking-widest font-light">{order.userEmail}</p>
                     </div>
                  </div>

                  <div>
                     <span className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-medium ${STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]}`}>
                        {order.status}
                     </span>
                  </div>

                  <div className="text-[14px] font-light text-white/80">${order.total}</div>

                  <div className="text-[10px] text-white/40 uppercase tracking-widest">
                     {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                  </div>

                  <div className="flex items-center justify-end gap-6">
                     <button 
                       onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                       className="p-2 hover:bg-white/5 rounded-full transition-colors"
                     >
                       <ChevronDown size={18} strokeWidth={1} className={`text-white/40 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                     </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-white/[0.01] px-10 py-12"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                         <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8">Manifest Contents</h4>
                            <div className="space-y-6">
                               {order.items.map((item, idx) => (
                                 <div key={idx} className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white/5 overflow-hidden">
                                       <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-60" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex-1">
                                       <div className="flex justify-between items-center mb-1">
                                          <p className="text-[11px] uppercase tracking-widest font-medium">{item.name}</p>
                                          <span className="text-[10px] text-white/40">Qty: {item.quantity}</span>
                                       </div>
                                       <p className="text-[9px] text-white/30 uppercase tracking-widest">{item.category}</p>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8">Management Controls</h4>
                            <div className="flex flex-wrap gap-4">
                               {Object.keys(STATUS_COLORS).map((status) => (
                                 <button 
                                   key={status}
                                   onClick={() => updateStatus(order.id, status)}
                                   className={`px-6 py-3 text-[9px] uppercase tracking-widest rounded-full border transition-all ${order.status === status ? 'border-white text-white bg-white/5' : 'border-white/10 text-white/30 hover:border-white/40'}`}
                                 >
                                   {status}
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
