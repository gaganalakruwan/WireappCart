import {createSlice} from '@reduxjs/toolkit';
import {CartItemType} from '../../../type';

export interface CartState {
  /**
   * Cart items
   */
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const index = state.items.findIndex(
        item =>
          item.SKU === action.payload.SKU && item.size === action.payload.size,
      );
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push({...action.payload});
      }
    },
    plus: (state, action) => {
      const index = state.items.findIndex(
        item =>
          item.SKU === action.payload.SKU && item.size === action.payload.size,
      );
      if (index !== -1) {
        state.items[index].quantity += 1;
      }
    },
    minus: (state, action) => {
      const index = state.items.findIndex(
        item =>
          item.SKU === action.payload.SKU && item.size === action.payload.size,
      );
      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item =>
          !(
            item.SKU === action.payload.SKU && item.size === action.payload.size
          ),
      );
    },
  },
});

export const {add, plus, minus, removeItem} = cartSlice.actions;
export default cartSlice.reducer;
