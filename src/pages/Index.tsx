import React, { useState } from 'react';
import { OrderForm } from '@/components/OrderForm';
import { MenuSearch } from '@/components/MenuSearch';
import { CurrentOrder } from '@/components/CurrentOrder';
import { UnavailableItems } from '@/components/UnavailableItems';
import { OrdersList } from '@/components/OrdersList';
import { Order, OrderItem } from '@/types/restaurant';
import { menuData } from '@/data/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Utensils } from 'lucide-react';

const Index = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
  const [showOrdersList, setShowOrdersList] = useState(false);

  const handleCreateOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending'
    };
    setCurrentOrder(newOrder);
  };

  const handleAddItem = (orderItem: OrderItem) => {
    if (!currentOrder) return;

    const existingItem = currentOrder.items.find(
      item => item.menuItem.id === orderItem.menuItem.id
    );

    if (existingItem) {
      handleUpdateItem(existingItem.id, existingItem.quantity + 1, existingItem.notes);
    } else {
      setCurrentOrder(prev => prev ? {
        ...prev,
        items: [...prev.items, orderItem]
      } : null);
    }
  };

  const handleUpdateItem = (itemId: string, quantity: number, notes?: string) => {
    if (!currentOrder) return;

    setCurrentOrder(prev => prev ? {
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, quantity, notes }
          : item
      )
    } : null);
  };

  const handleRemoveItem = (itemId: string) => {
    if (!currentOrder) return;

    setCurrentOrder(prev => prev ? {
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    } : null);
  };

  const handleCompleteOrder = () => {
    if (!currentOrder) return;

    const completedOrder: Order = {
      ...currentOrder,
      status: 'completed'
    };

    setCompletedOrders(prev => [completedOrder, ...prev]);
    setCurrentOrder(null);
  };

  const handleCancelOrder = () => {
    setCurrentOrder(null);
  };

  const handleToggleUnavailable = (itemId: string) => {
    setUnavailableItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold font-persian">
                  سیستم سفارش رستوران شریف
                </h1>
                <p className="text-sm opacity-90 font-persian">
                  مدیریت سفارشات و منوی رستوران
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showOrdersList ? 'secondary' : 'outline'}
                onClick={() => setShowOrdersList(!showOrdersList)}
                className="font-persian"
              >
                <Utensils className="w-4 h-4 mr-2" />
                {showOrdersList ? 'منوی غذا' : 'لیست سفارشات'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!currentOrder && (
              <OrderForm onSubmit={handleCreateOrder} />
            )}

            {!showOrdersList ? (
              <MenuSearch
                onAddItem={handleAddItem}
                unavailableItems={unavailableItems}
                onToggleUnavailable={handleToggleUnavailable}
              />
            ) : (
              <OrdersList orders={completedOrders} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CurrentOrder
              currentOrder={currentOrder}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              onCompleteOrder={handleCompleteOrder}
              onCancelOrder={handleCancelOrder}
            />

            <UnavailableItems
              unavailableItems={unavailableItems}
              menuItems={menuData}
              onToggleUnavailable={handleToggleUnavailable}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="restaurant-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-primary font-persian">
                {completedOrders.length}
              </h3>
              <p className="text-sm text-muted-foreground font-persian">
                سفارشات تکمیل شده
              </p>
            </CardContent>
          </Card>
          
          <Card className="restaurant-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-restaurant-green font-persian">
                {menuData.length - unavailableItems.length}
              </h3>
              <p className="text-sm text-muted-foreground font-persian">
                آیتم‌های موجود
              </p>
            </CardContent>
          </Card>
          
          <Card className="restaurant-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-restaurant-unavailable-red font-persian">
                {unavailableItems.length}
              </h3>
              <p className="text-sm text-muted-foreground font-persian">
                آیتم‌های ناموجود
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
