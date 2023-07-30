import { useState } from 'react';
import './App.css';
import Header from './Layout/Header';
import Meals from './Meals/Meals';
import Cart from './Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShowen,setCartIsShowen]=useState(false)

  const showCarthandler =()=>{
    setCartIsShowen(true)
  }
  const hideCarthandler =()=>{
    setCartIsShowen(false)
  }
  return (
    <CartProvider>
      {cartIsShowen&&<Cart onHideCart={hideCarthandler}/>}
      <Header onShowCart={showCarthandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
