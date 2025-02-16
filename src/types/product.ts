import { TUser } from "./users";

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
  user: TUser;
  product: TProduct;
  orderQuantity: number;
  totalPrice: number;
  estimatedDeliveryDate: Date;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
