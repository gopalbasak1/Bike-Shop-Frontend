import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: string; // Product ID
  name: string;
  price: number;
  orderQuantity: number;
  stock: number; // Total quantity in stock
  inStock?: boolean; // Optional boolean to indicate stock status
  imageUrl: string;
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      console.log({ state: state.items });

      console.log("Redux Cart Before:", JSON.stringify(state.items));
      console.log("Adding to Cart:", JSON.stringify(action.payload));

      const existingItem = state.items.find(
        (item) => item.product === action.payload.product
      );
      if (existingItem) {
        existingItem.orderQuantity += action.payload.orderQuantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.orderQuantity;
      state.totalPrice += action.payload.price * action.payload.orderQuantity;

      console.log("Redux Cart After:", JSON.stringify(state.items));
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.orderQuantity;
        state.totalPrice -= existingItem.price * existingItem.orderQuantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.orderQuantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.orderQuantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, orderQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === id);
      if (existingItem) {
        existingItem.orderQuantity = orderQuantity;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  removeProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
