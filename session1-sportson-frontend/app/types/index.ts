export interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  stock: number;
  price: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Bank {
  _id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  paymentProof: string;
  status: 'pending' | 'paid' | 'rejected';
  purchasedItems: {
    productId: string;
    qty: number;
  };
  totalPayment: number;
  customerName: string;
  customerContact: number | null;
  customerAddress: string;
  createdAt: string;
  updatedAt: string;
}
