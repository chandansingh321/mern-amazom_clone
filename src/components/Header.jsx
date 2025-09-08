import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaShoppingCart, FaBars } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showAccountList, setShowAccountList] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const [searchTerm, setSearchTerm] = useState('');


  //logout funtion
  const logout =()=>{
    localStorage.clear();
  }
  const userdata=localStorage.getItem("user")
  const username = JSON.parse(userdata)?.userData?.name
  const firstname = username?.split(' ')[0];


  
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
  }
  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Top Row */}
      <div className="flex items-center px-4 py-2">
        {/* Logo */}
        <div className="flex items-center mr-4">
          <div className="text-2xl font-bold text-white mr-1">amazon</div>
          <span className="text-xs italic font-light">.in</span>
        </div>

        {/* Delivery Location */}
        <div className="flex items-center mr-4 cursor-pointer hover:border hover:border-white p-1">
          <FaMapMarkerAlt className="mr-1" />
          <div>
            <div className="text-xs text-gray-300">Deliver to</div>
            <div className="text-sm font-bold">India</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 mx-4">
          <div className="flex w-full">
            <select className="bg-gray-100 text-black rounded-l-md px-2 border-r border-gray-300 text-sm focus:outline-none">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 text-black focus:outline-none"
              placeholder="Search Amazon.in"
            />
            <button onClick={handleSearch} className="bg-[#FEBD69] text-black px-4 rounded-r-md hover:bg-[#F3A847]">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center mr-4 cursor-pointer hover:border hover:border-white p-1">
          <div>
            <div className="text-xs text-gray-300">EN</div>
            <div className="flex items-center text-sm font-bold">
              <span>English</span>
              <IoMdArrowDropdown />
            </div>
          </div>
        </div>

        {/* Account & Lists - Updated with hover dropdown */}
        <div 
          className="relative mr-4"
          onMouseEnter={() => setShowAccountList(true)}
          onMouseLeave={() => setShowAccountList(false)}
        >
          <div className="flex flex-col cursor-pointer hover:border hover:border-white p-1">
          <div className="text-xs">Hello, {firstname ? firstname : 'Sign in'}</div>

            <div className="flex items-center text-sm font-bold">
              <span>Account & Lists</span>
              {showAccountList ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>
          </div>

          {/* Dropdown Content */}
          {showAccountList && (
            <div className="absolute right-0 mt-0 w-72 bg-white text-black shadow-lg rounded-sm z-50 border border-gray-200">
              <div className="p-4">
                {/* Sign In Section */}
                {username?
                    <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-1 px-3 rounded-md text-sm"
                    onClick={logout}>
                      Logout
                    </button>:
                <div className="mb-4">
                  <Link to="/login">
                    <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-1 px-3 rounded-md text-sm">
                      Sign in
                    </button>
                  </Link>
                  <div className="text-xs mt-1">
                    New customer?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                      Start here.
                    </Link>
                  </div>
                </div>}

                {/* <div className="border-t border-gray-200 pt-3">
                  <h3 className="font-bold text-sm mb-2">Your Lists</h3>
                  <ul className="text-sm">
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/wishlist">Create a Wish List</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/lists">Wish from Any Website</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/baby-registry">Baby Wishlist</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/discover">Discover Your Style</Link>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-2">
                  <h3 className="font-bold text-sm mb-2">Your Account</h3>
                  <ul className="text-sm">
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/account">Account</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/recommendations">Recommendations</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/browsing-history">Browsing History</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-2 py-1">
                      <Link to="/watchlist">Watchlist</Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div className="flex flex-col mr-4 cursor-pointer hover:border hover:border-white p-1">
          <div className="text-xs">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="flex items-center cursor-pointer hover:border hover:border-white p-1">
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-[#F3A847] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </div>
          <span className="ml-1 text-sm font-bold">Cart</span>
        </Link>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center bg-[#232F3E] px-4 py-1">
        <div className="flex items-center mr-4 cursor-pointer hover:border hover:border-white p-1">
          <FaBars className="mr-1" />
          <span className="text-sm font-bold">All</span>
        </div>
        <nav className="flex space-x-4 text-sm">
          <a href="#" className="hover:border hover:border-white p-1">Today's Deals</a>
          <a href="#" className="hover:border hover:border-white p-1">Customer Service</a>
          <a href="#" className="hover:border hover:border-white p-1">Registry</a>
          <a href="#" className="hover:border hover:border-white p-1">Gift Cards</a>
          <a href="#" className="hover:border hover:border-white p-1">Sell</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;