// import logo from './logo.svg';
// import './App.css'; 
// import Signup from './screen/Sign-up'
// import Dashboard from './screen/Dashboard';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './screen/Login'; // Create this component if needed
// import ForgotPasswordPage from './screen/Forget';
// import CartPage from './screen/Cart';
// import ViewProductPage from './screen/view-product';
// import ProductsGrid from './screen/Show-product';



// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         <Route path="/dashboard" element={  <PrivateRoute></PrivateRoute><Dashboard />} />
//         <Route path="/forget" element={<ForgotPasswordPage />} />
//         <Route path="/cart" element={<CartPage/>} />
//         <Route path="/product" element={<ProductsGrid/>} />
//         <Route path="/viewproduct" element={<ViewProductPage/>} />



//       </Routes>
//     </Router>
//   );
// }

// export default App;


import './App.css'; 
import Signup from './screen/Sign-up'
import Dashboard from './screen/Dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import ForgotPasswordPage from './screen/Forget';
import CartPage from './screen/Cart';
import ViewProductPage from './screen/view-product';
import ProductsGrid from './screen/Show-product';
import PrivateRoute from './routeGuard/PrivateRoute';
import PublicRoute from './routeGuard/PublicRoute';
import SearchResults from './components/SearchResults';
// import PrivateRoute from './components/PrivateRoute'; // Import the route guard

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forget" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
        {/* Private Routes */} 
        <Route 
          path="/" 
          element={
              <Dashboard />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <PrivateRoute>
              <SearchResults />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <PrivateRoute>
              <ProductsGrid />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/viewproduct/:id" 
          element={
            <PrivateRoute>
              <ViewProductPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

