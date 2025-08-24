import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Order, OrderItem } from '@/types/restaurant';
import { Plus, Minus, Trash2, ShoppingCart, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CurrentOrderProps {
  currentOrder: Order | null;
  onUpdateItem: (itemId: string, quantity: number, notes?: string) => void;
  onRemoveItem: (itemId: string) => void;
  onCompleteOrder: () => void;
  onCancelOrder: () => void;
}

export const CurrentOrder: React.FC<CurrentOrderProps> = ({
  currentOrder,
  onUpdateItem,
  onRemoveItem,
  onCompleteOrder,
  onCancelOrder
}) => {
  const { toast } = useToast();
  const [itemNotes, setItemNotes] = useState<{[key: string]: string}>({});

  if (!currentOrder) {
    return (
      <Card className="restaurant-card">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-persian">
            هیچ سفارشی در حال پردازش نیست
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = currentOrder.items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      onUpdateItem(itemId, newQuantity, itemNotes[itemId]);
    }
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setItemNotes(prev => ({ ...prev, [itemId]: notes }));
    const item = currentOrder.items.find(i => i.id === itemId);
    if (item) {
      onUpdateItem(itemId, item.quantity, notes);
    }
  };

  const handleCompleteOrder = () => {
    if (currentOrder.items.length === 0) {
      toast({
        title: "خطا",
        description: "سفارش خالی است",
        variant: "destructive",
      });
      return;
    }
    
    onCompleteOrder();
    toast({
      title: "موفقیت",
      description: "سفارش با موفقیت ثبت شد",
    });
  };

  return (
    <Card className="restaurant-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-persian">
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            سفارش جاری
          </span>
          <Badge variant="secondary" className="font-persian">
            میز {currentOrder.tableNumber}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground font-persian">مشتری: </span>
            <span className="font-persian">{currentOrder.customerName}</span>
          </div>
          <div>
            <span className="text-muted-foreground font-persian">تلفن: </span>
            <span className="font-persian" dir="ltr">{currentOrder.customerPhone}</span>
          </div>
          <div>
            <span className="text-muted-foreground font-persian">تعداد نفرات: </span>
            <span className="font-persian">{currentOrder.numberOfPeople} نفر</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium font-persian">آیتم‌های سفارش:</h4>
          
          {currentOrder.items.length === 0 ? (
            <p className="text-muted-foreground text-sm font-persian text-center py-4">
              هنوز آیتمی به سفارش اضافه نشده
            </p>
          ) : (
            currentOrder.items.map(item => (
              <div key={item.id} className="order-item">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium font-persian text-sm">
                      {item.menuItem.name}
                    </h5>
                    {item.menuItem.description && (
                      <p className="text-xs text-muted-foreground font-persian">
                        {item.menuItem.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-persian text-sm min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`notes-${item.id}`} className="text-xs font-persian">
                    یادداشت (اختیاری)
                  </Label>
                  <Input
                    id={`notes-${item.id}`}
                    type="text"
                    placeholder="مثال: بدون پیاز"
                    value={itemNotes[item.id] || item.notes || ''}
                    onChange={(e) => handleNotesChange(item.id, e.target.value)}
                    className="font-persian text-xs"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            variant="restaurant"
            onClick={handleCompleteOrder}
            className="flex-1"
            disabled={currentOrder.items.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            ثبت سفارش
          </Button>
          <Button
            variant="outline"
            onClick={onCancelOrder}
          >
            لغو
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};