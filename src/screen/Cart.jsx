import { useState, useEffect, useMemo } from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getUserData } from '../commonfuntion/getuserdata';
const apiUrl = process.env.REACT_APP_API_URL
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = getUserData()?.id;
const apiUrl = process.env.REACT_APP_API_URL
  

  const tokenData = localStorage.getItem("user");
  let userToken = null;
  try {
    userToken = tokenData ? JSON.parse(tokenData)?.token : null;
  } catch (error) {
    console.error('Invalid token data in localStorage');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  };

  const   fetchCartData = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/cart/cart/${id}`, {
        method: "GET",
        headers: headers
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch cart data');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        
        const result = await fetchCartData(id);
        console.log(result)
        // Ensure we have an array with proper item structure
        const safeCartItems = Array.isArray(result.data) 
          ? result.data.map(item => ({
              id: item._id || 0,
              name: item.products.name || 'Unknown Product',
              price: Number(item.products.price) || 0,
              image: item.products.image || 'https://via.placeholder.com/80',
              quantity: Number(item.quantity) || 1,
              inStock: item.inStock !== undefined ? item.inStock : true
            }))
          : [];
        setCartItems(safeCartItems);
      } catch (err) {
        console.error('Failed to load cart data');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);


  const removeItem = async (itemId) => {
    console.log('Removing item:', itemId);
  
    try {
      const response = await fetch(`${apiUrl}/cart/delete/${itemId}`, {
        method: "DELETE",
        headers: headers
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to remove item');
      }
  
      console.log('Item removed:', result);
  
      // ✅ Re-fetch updated cart data
      const updatedCart = await fetchCartData(id);
      const safeCartItems = Array.isArray(updatedCart.data)
        ? updatedCart.data.map(item => ({
            id: item._id || 0,
            name: item.products.name || 'Unknown Product',
            price: Number(item.products.price) || 0,
            image: item.products.image || 'https://via.placeholder.com/80',
            quantity: Number(item.quantity) || 1,
            inStock: item.inStock !== undefined ? item.inStock : true
          }))
        : [];
  
      setCartItems(safeCartItems);
  
    } catch (error) {
      console.error('Remove Item Error:', error);
    }
  };
  
  

  // Calculate subtotal with safe defaults
  const subtotal = cartItems.reduce(
    (total, item) => total + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
    0
  );

  // Calculate tax (example: 10%)
  const tax = subtotal * 0.1;

  // Calculate total
  const total = subtotal + tax;

  // Memoize out of stock check for performance
  const hasOutOfStockItems = useMemo(() => 
    cartItems.some(item => !item.inStock), [cartItems]
  );

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  // const removeItem = id => {
  //   setCartItems(cartItems.filter(item => item.id !== id));
  // };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FiShoppingCart className="mr-2" />
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                <div className="col-span-6 font-medium">Product</div>
                <div className="col-span-2 font-medium text-center">Price</div>
                <div className="col-span-2 font-medium text-center">Quantity</div>
                <div className="col-span-2 font-medium text-center">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="p-4 border-b last:border-b-0 flex flex-col md:grid md:grid-cols-12 gap-4"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {!item.inStock && (
                        <span className="text-red-500 text-sm">Out of Stock</span>
                      )}
                      <button
                        onClick={() => removeItem(item?.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center md:justify-center">
                    <span className="md:hidden font-medium mr-2">Price: </span>
                    ${(item.price || 0).toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center md:justify-center">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex items-center md:justify-center font-medium">
                    <span className="md:hidden mr-2">Total: </span>
                    ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FiPlus className="mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-md text-white font-medium ${
                  hasOutOfStockItems
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition`}
                disabled={hasOutOfStockItems}
              >
                {hasOutOfStockItems
                  ? 'Cannot Checkout (Out of Stock Items)'
                  : 'Proceed to Checkout'}
              </button>

              {/* Payment Options */}
              <div className="mt-4 flex justify-center space-x-4">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg"
                  alt="Visa"
                  className="h-8 opacity-70"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg"
                  alt="Mastercard"
                  className="h-8 opacity-70"
                />
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg"
                  alt="PayPal"
                  className="h-8 opacity-70"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow p-6 mt-4">
              <h3 className="font-medium mb-2">Promo Code</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
