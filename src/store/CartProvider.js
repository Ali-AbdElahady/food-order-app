import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + (action.item.price * action.item.amount);

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
      state.totalAmount - existingCartItem.price;

    let updatedCartItems;

    if (existingCartItem.amount === 1) {

      updatedCartItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
      updatedCartItems = [...state.items]
      updatedCartItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount
    }
  }
  return state;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
