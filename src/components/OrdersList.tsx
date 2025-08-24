import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/types/restaurant';
import { Receipt, Clock, CheckCircle } from 'lucide-react';

interface OrdersListProps {
  orders: Order[];
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'confirmed':
        return <Receipt className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-restaurant-green" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'در انتظار';
      case 'confirmed':
        return 'تایید شده';
      case 'completed':
        return 'تکمیل شده';
    }
  };

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'confirmed':
        return 'default';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="restaurant-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-persian">
          <Receipt className="w-5 h-5 text-primary" />
          سفارشات ثبت شده
          <Badge variant="secondary" className="font-persian">
            {orders.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center py-4 font-persian">
            هنوز سفارشی ثبت نشده است
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="order-item">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium font-persian">
                        میز {order.tableNumber}
                      </h4>
                      <Badge variant={getStatusVariant(order.status)} className="font-persian text-xs">
                        {getStatusIcon(order.status)}
                        <span className="mr-1">{getStatusText(order.status)}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-persian">
                      {order.customerName} • {order.numberOfPeople} نفر
                    </p>
                    <p className="text-xs text-muted-foreground font-persian" dir="ltr">
                      {order.customerPhone}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-persian">
                    {new Date(order.createdAt).toLocaleString('fa-IR')}
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-2">
                  <h5 className="text-sm font-medium font-persian">آیتم‌های سفارش:</h5>
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <span className="font-persian">{item.menuItem.name}</span>
                        {item.notes && (
                          <span className="text-muted-foreground font-persian text-xs mr-2">
                            ({item.notes})
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="font-persian">
                        {item.quantity}×
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};