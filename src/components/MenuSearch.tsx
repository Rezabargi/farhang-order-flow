import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Clock } from 'lucide-react';
import { MenuItem, OrderItem } from '@/types/restaurant';
import { menuData } from '@/data/menu';

interface MenuSearchProps {
  onAddItem: (item: OrderItem) => void;
  unavailableItems: string[];
  onToggleUnavailable: (itemId: string) => void;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({ 
  onAddItem, 
  unavailableItems, 
  onToggleUnavailable 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useMemo(() => {
    const cats = [...new Set(menuData.map(item => item.category))];
    return cats;
  }, []);

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddItem = (menuItem: MenuItem) => {
    const orderItem: OrderItem = {
      id: Date.now().toString(),
      menuItem,
      quantity: 1
    };
    onAddItem(orderItem);
  };

  const isUnavailable = (itemId: string) => unavailableItems.includes(itemId);

  return (
    <div className="space-y-4">
      <Card className="restaurant-card">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجوی غذا یا نوشیدنی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-persian"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === '' ? 'persian' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
                className="font-persian"
              >
                همه
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'persian' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="font-persian"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <Card 
            key={item.id} 
            className={`restaurant-card ${isUnavailable(item.id) ? 'unavailable-item' : ''}`}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium font-persian text-sm">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted-foreground font-persian mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="font-persian text-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  {!isUnavailable(item.id) ? (
                    <>
                      <Button
                        variant="order"
                        size="sm"
                        onClick={() => handleAddItem(item)}
                        className="flex-1 font-persian"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        افزودن
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleUnavailable(item.id)}
                        className="font-persian"
                      >
                        <Clock className="w-3 h-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="unavailable"
                        size="sm"
                        disabled
                        className="flex-1 font-persian"
                      >
                        ناموجود
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleUnavailable(item.id)}
                        className="font-persian"
                      >
                        بازگردانی
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="restaurant-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground font-persian">
              آیتمی با این جستجو یافت نشد
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};