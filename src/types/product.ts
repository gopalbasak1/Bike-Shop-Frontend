import { TUser } from "./users";

export type TProduct = {
  user: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  totalQuantity: number;
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

export type TTransaction = {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};

export type TOrder = {
  _id: string;
  user: TUser;
  product: TProduct;

  orderQuantity: number;
  totalPrice: number;
  estimatedDeliveryDate: Date;
  transaction: TTransaction;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
