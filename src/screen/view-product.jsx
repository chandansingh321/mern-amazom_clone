import { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiChevronLeft } from 'react-icons/fi';
import { FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../api/cart';
import {getUserData} from '../commonfuntion/getuserdata'
const apiUrl = process.env.REACT_APP_API_URL

const ViewProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();


  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/products/productone/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch product');
      }
      
      const result = await response.json();
      return result.data;
      
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };

  useEffect(() => {
    
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProduct(id);
        // console.log(productData,"ghgfghfghfhgf")
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) loadProduct();
  }, [id]);

  // Render loading state
  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  
  // Render error state
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  
  // Render if product not found
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

  // Rest of your component code remains the same...
  // Just make sure to use the product state properly (it's now a single object, not an array)

  // Sample related products
  const relatedProducts = [
    {
      id: 2,
      name: 'Noise Cancelling Earbuds',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Wired Headphones',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1545127398-5aae47194b22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 3.5
    }
  ];

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 inline" />);
      }
    }
    

    return stars;
  };
  const handleAddToCart = async () => {
    const user = getUserData()
      try {
        const data={
          
          user:user.id,
          items:product._id
        }
        await addToCart(data);
        
      } catch (error) {
        console.log("item not added")
      }
    };

  return (
    <div className="container mx-auto px-4 py-8">
        
      <Link to={`/product/${product.categoryId}`} className="flex items-center text-blue-600 hover:text-blue-500 mb-6">
        <FiChevronLeft className="mr-1" /> Back to Products
      </Link>

      {/* Product Main Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          {/* Main Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Thumbnail Gallery */}
          {/* <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-100 rounded-md overflow-hidden h-20 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="mr-2">
              {renderStars(product?.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product?.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">${product?.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${product?.originalPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <span className="ml-2 text-green-600 font-medium">{product.discount}% OFF</span>
            )}
          </div>

          {/* Availability */}
          {/* <div className="mb-6">
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div> */}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 bg-white">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-6 rounded-md flex items-center justify-center ${
                product?.stock>=1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              } transition`}
              disabled={!product?.stock>=1}
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={toggleWishlist}
              className={`py-3 px-6 rounded-md flex items-center justify-center ${
                isWishlisted
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition`}
            >
              {isWishlisted ? (
                <FaHeart className="mr-2 text-red-600" />
              ) : (
                <FiHeart className="mr-2" />
              )}
              Wishlist
            </button>
          </div>

          {/* Highlights */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h3 className="font-medium mb-2">Highlights</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features?.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({product?.reviews})
            </button>
          </nav>
        </div>

        {/* <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-600">{key}: </span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div> */}
      </div>

      {/* Related Products */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
              <Link to={`/products/${product.id}`}>
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ViewProductPage;