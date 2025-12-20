import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext';
import Payment from './Components/Payment/Payment';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'categoryDetails/:id', element: <ProtectedRoute> <CategoryDetails /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'brandDetails/:id', element: <ProtectedRoute> <BrandDetails /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute> <Payment /> </ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Notfound /> },
    ]
  }
], { basename: '/Fresh-Cart/' });

const reactQueryConfig = new QueryClient();
function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </WishListContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  )
}

export default App