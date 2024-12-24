import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../hook/useAuth';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartQuantity: 0,
    cartTotalAmount: 0,
    cartSubTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      console.log('actionpayload', productId, variantId, quantity);
    
      // Tìm mục trong giỏ hàng
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId && item.variantId === variantId
      );
    
      if (existingItem) {
        // Nếu mục đã tồn tại, cập nhật số lượng
        existingItem.quantity += quantity;
      } else {
        // Nếu không tìm thấy, thêm mục mới vào giỏ hàng
        state.cartItems.push({ productId, variantId, quantity });
      }
    
      console.log('state.cartItems', state.cartItems);
    },
    
    updateQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.cartItems.find(
        (cartItem) =>
          cartItem.productId === productId &&
          cartItem.variantId === variantId
      );
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action) => {
      const { productId, variantId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) =>
          !(cartItem.productId === productId &&
            cartItem.variantId === variantId)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartQuantity = 0;
      state.cartTotalAmount = 0;
      state.cartSubTotal = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
