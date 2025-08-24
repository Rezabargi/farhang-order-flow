export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  isAvailable?: boolean;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  numberOfPeople: number;
  items: OrderItem[];
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface UnavailableItem {
  id: string;
  menuItem: MenuItem;
  addedAt: Date;
}