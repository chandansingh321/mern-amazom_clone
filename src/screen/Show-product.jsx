import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/viewproduct/${product._id}`} 
      className="relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">{product.name}</h3>
        <span className="text-lg font-bold text-gray-900">${product.price}</span>
      </div>
    </Link>
  );
};

// Example usage:
const ProductsGrid = () => {
  const [products, setProduct] = useState(null)
  const { id } = useParams();
  const fetchProduct = async (id) => {
      try {
        const response = await fetch(`${apiUrl}/products/product/${id}`);
        
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
          const productData = await fetchProduct(id);
          // console.log(productData,"ghgfghfghfhgf")
          setProduct(productData);
        } catch (err) {
          console.log(err.message);
        }
      };
      
      if (id) loadProduct();
    }, [id]);
  // const products = [
  //   {
  //     id: 1,
  //     name: 'Wireless Bluetooth Headphones with Mic',
  //     image: 'https://m.media-amazon.com/images/I/71jlppwxmqL._AC_UL320_.jpg',
  //     price: 59.99
  //   },
  //   {
  //     id: 2,
  //     name: 'Smart Watch with Fitness Tracker',
  //     image: 'https://m.media-amazon.com/images/I/61HhS0md-AL._AC_UL320_.jpg',
  //     price: 79.99
  //   },{
  //     id: 3,
  //     name: 'Wireless Bluetooth Headphones with Mic',
  //     image: 'https://m.media-amazon.com/images/I/71jlppwxmqL._AC_UL320_.jpg',
  //     price: 59.99
  //   },
  //   {
  //     id: 4,
  //     name: 'Smart Watch with Fitness Tracker',
  //     image: 'https://m.media-amazon.com/images/I/61HhS0md-AL._AC_UL320_.jpg',
  //     price: 79.99
  //   },
  //   {
  //     id: 5,
  //     name: 'Wireless Bluetooth Headphones with Mic',
  //     image: 'https://m.media-amazon.com/images/I/71jlppwxmqL._AC_UL320_.jpg',
  //     price: 59.99
  //   },
  //   {
  //     id: 6,
  //     name: 'Smart Watch with Fitness Tracker',
  //     image: 'https://m.media-amazon.com/images/I/61HhS0md-AL._AC_UL320_.jpg',
  //     price: 79.99
  //   }
  //   // Add more products as needed
  // ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;