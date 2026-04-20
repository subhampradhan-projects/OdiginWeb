export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gender: 'Male' | 'Female' | 'Unisex';
  color: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface JournalPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string | null;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}
