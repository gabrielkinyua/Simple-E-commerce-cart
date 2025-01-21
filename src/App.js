import React from 'react';
import './App.css';

const App = () => {
  const products = [
    { "id": 1, "name": "T-Shirt", "price": 20 },

    { "id": 2, "name": "Jeans", "price": 40 },
  
    { "id": 3, "name": "Sneakers", "price": 60 },
  
    { "id": 4, "name": "Hat", "price": 15 },
  
    { "id": 5, "name": "Socks", "price": 5 }
  ];

  // State of the cart
  const [cart, setCart] = React.useState([]);

  // Function to add a product to the cart
  const addToCart = product => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const productInCart = prevCart.find(item => item.id === product.id);
      if (productInCart) {
        // If it is, update the quantity
        return prevCart.map(item =>
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        // Otherwise, add the product to the cart
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  // checkout  function
  const checkout = () => {
    alert('Checkout successful');
    setCart([]); // clear the cart
  }; 

  // clearCart function
  const clearCart = () => {
    setCart([]); // clear the cart
  };

  // remove from cart function
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== product.id));
  };

  // Increment quantity function
  const increaseQuantity = (product) => {
    setCart((prevCart) =>  prevCart.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    ));
    }; 

  // Decrement quantity function
  const decreaseQuantity = (product) => {
    setCart((prevCart) =>  prevCart.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity - 1} : item
    ));
    };
 


  return (
    <div className='App'>
      <h1>Welcome to the store</h1>
      

      {/* Products */}
      <h2>Products List</h2>
      <ProductList products={products} addToCart ={addToCart} />

      {/* Cart summary*/}
      <CartSummary cart={cart}
        clearCart={clearCart} 
        checkout={checkout}
         removeFromCart={removeFromCart} 
         increaseQuantity={increaseQuantity} 
         decreaseQuantity={decreaseQuantity}/>
    </div>
  );
};

const ProductList = ({products, addToCart}) => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

const CartSummary = ({cart, clearCart, checkout, removeFromCart, increaseQuantity, decreaseQuantity}) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name} x {item.quantity}</p>
          <p>Price: ${item.price * item.quantity}</p>
          
          {/** Increase and decrease quantity buttons */}
          <button onClick={() => increaseQuantity(item)}>+</button>
          <button onClick={() => decreaseQuantity(item)}>-</button>
          
          {/** Remove button */}
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
      <p>Total: ${totalPrice}</p>
      <button onClick={clearCart}>Clear Cart</button>
      {cart.length > 0 && <button onClick={checkout}>Checkout</button>}
    </div>
  );

};

export default App

