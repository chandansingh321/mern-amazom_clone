import { useState,useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL
const HomePage = () => {
  const [wishlist, setWishlist] = useState([]);
const [categoriesData,setCategoriesData]=useState([])
  // Sample categories and products data
  let categories=[]
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories/category`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
         categories = await response.json();
         setCategoriesData(categories.data)
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);


  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 md:p-12 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-white text-opacity-90 max-w-2xl mx-auto">
          Discover amazing products across various categories
        </p>
      </div>

      {/* Categories with Products */}
      {categoriesData.map((category) => (
        <div key={category.id} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold capitalize">{category.name}</h2>
            <a href={`/categories/${category.name.toLowerCase()}`} className="text-blue-600 hover:underline">
              <Link to={`/product/${category._id}`}>View All</Link>
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {category.products.map((product) => (
              <div key={product.id} className="group relative">
                {/* Product Card */}
                <Link to={`/viewproduct/${product._id}`}  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                  {/* Product Image */}
                  <div  className="ct-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 transition hover:bg-opacity-100"
                    >
                      {wishlist.includes(product.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1 truncate">{product.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to find your perfect product?</h2>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium">
          Browse All Products
        </button>
      </div>
    </div>
  );
};

export default HomePage;