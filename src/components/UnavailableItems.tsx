import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/types/restaurant';
import { Clock, RotateCcw } from 'lucide-react';

interface UnavailableItemsProps {
  unavailableItems: string[];
  menuItems: MenuItem[];
  onToggleUnavailable: (itemId: string) => void;
}

export const UnavailableItems: React.FC<UnavailableItemsProps> = ({
  unavailableItems,
  menuItems,
  onToggleUnavailable
}) => {
  const unavailableMenuItems = menuItems.filter(item => 
    unavailableItems.includes(item.id)
  );

  return (
    <Card className="restaurant-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-persian">
          <Clock className="w-5 h-5 text-restaurant-unavailable-red" />
          آیتم‌های ناموجود
          <Badge variant="secondary" className="font-persian">
            {unavailableItems.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {unavailableItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-4 font-persian">
            همه آیتم‌ها موجود هستند
          </p>
        ) : (
          <div className="space-y-2">
            {unavailableMenuItems.map(item => (
              <div key={item.id} className="unavailable-item flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium font-persian text-sm">
                    {item.name}
                  </h4>
                  <Badge variant="outline" className="font-persian text-xs mt-1">
                    {item.category}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleUnavailable(item.id)}
                  className="font-persian"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  بازگردانی
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};