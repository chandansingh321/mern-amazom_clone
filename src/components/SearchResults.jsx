import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL
const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const query = new URLSearchParams(location.search).get('q');
  console.log(query)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/search?q=${query}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4 flex justify-center ">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p> No products found.</p>
        ) : (
          products.map(product => (
            <div key={product._id} className="border p-4 rounded shadow-sm">
              <img src={product.image} alt={product.name} className="h-32 object-cover mb-2" />
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <p className="text-gray-600 text-sm">₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
