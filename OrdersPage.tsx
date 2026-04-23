import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Bell, CheckCircle, Clock } from 'lucide-react';
import { Order } from '../types';
import { formatDate } from '../utils/helpers';

interface OrdersPageProps {
  orders: Order[];
}

export function OrdersPage({ orders }: OrdersPageProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-400" />
            Your Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No orders yet</p>
              <p className="text-slate-500 text-sm mt-1">Your purchased products will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{order.productName}</p>
                    <p className="text-slate-400 text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">${order.price}</span>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      order.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {order.status === 'completed' ? (
                        <><CheckCircle className="w-3 h-3" /> Completed</>
                      ) : (
                        <><Clock className="w-3 h-3" /> Pending</>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}