import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/restaurant';
import { Plus, User, Phone, Users, Table } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber && customerName && customerPhone && numberOfPeople) {
      onSubmit({
        tableNumber,
        customerName,
        customerPhone,
        numberOfPeople: parseInt(numberOfPeople),
        items: []
      });
      
      // Reset form
      setTableNumber('');
      setCustomerName('');
      setCustomerPhone('');
      setNumberOfPeople('');
    }
  };

  return (
    <Card className="restaurant-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-persian">
          <Plus className="w-5 h-5 text-primary" />
          سفارش جدید
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tableNumber" className="flex items-center gap-2 font-persian">
                <Table className="w-4 h-4" />
                شماره میز
              </Label>
              <Input
                id="tableNumber"
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="مثال: ۱"
                className="font-persian"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople" className="flex items-center gap-2 font-persian">
                <Users className="w-4 h-4" />
                تعداد نفرات
              </Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                placeholder="مثال: ۴"
                className="font-persian"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="flex items-center gap-2 font-persian">
                <User className="w-4 h-4" />
                نام و نام خانوادگی
              </Label>
              <Input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="مثال: احمد احمدی"
                className="font-persian"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerPhone" className="flex items-center gap-2 font-persian">
                <Phone className="w-4 h-4" />
                شماره تماس
              </Label>
              <Input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                className="font-persian"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="restaurant" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            ایجاد سفارش جدید
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};