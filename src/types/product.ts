export type TProduct = {
  user: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  image: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TOrder = {
  _id: string;
  user: object;
  product: object;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
