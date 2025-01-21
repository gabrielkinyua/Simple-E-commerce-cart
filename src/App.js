import React from 'react';
import './App.css';

const App = () => {
  const products = [
    { 
      id: 1, 
      name: "T-Shirt", 
      price: 20, 
      image: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726721_1280.jpg"
    },
      
    { 
      id: 2, 
      name: "Jeans", 
      price: 40, 
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
      
    { 
      id: 3, 
      name: "Sneakers", 
      price: 60, 
      image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
      
    { 
      id: 4, 
      name: "Hat", 
      price: 15, 
      image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      id: 5, 
      name: "Socks", 
      price: 20, 
      image: "https://images.unsplash.com/photo-1535486648131-54a1558cb3fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
      

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
//  ProductList  components
const ProductList = ({products, addToCart}) => {
  return (
    <div className='product-list'>
      {products.map(product => (
        <div key={product.id} className='product'>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <div className='image-container'>
          <img src={product.image} alt={product.name} />
          </div>
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

// CartSummary component
const CartSummary = ({cart, clearCart, checkout, removeFromCart, increaseQuantity, decreaseQuantity}) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='cart'>
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
      <div className='cart-summary'>
      <p>Total: ${totalPrice}</p>
      <button onClick={clearCart}>Clear Cart</button>
      {cart.length > 0 && <button onClick={checkout}>Checkout</button>}
      </div>
    </div>
  );

};

export default App

